const AWS = require("aws-sdk");
const { Decimal } = require("decimal.js");
const { RangeQuery } = require("./range_query"); // Assuming you have a similar RangeQuery class in JavaScript

class DynamoDBConnector {
  constructor(tableName, session = null) {
    if (!session) {
      AWS.config.update({ region: "eu-west-1" });
      session = new AWS.DynamoDB();
    }

    this.dynamodb = new AWS.DynamoDB.DocumentClient({ service: session });
    this.client = session;
    this.tableName = tableName;
  }

  async primaryKey() {
    const data = await this.client
      .describeTable({ TableName: this.tableName })
      .promise();
    const keys = data.Table.KeySchema;
    return keys.find((key) => key.KeyType === "HASH").AttributeName;
  }

  async fetchItems(key, value) {
    let keyConditionExpression = `${key} = :value`;
    let expressionAttributeValues = { ":value": value };

    try {
      const params = {
        TableName: this.tableName,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ScanIndexForward: false,
      };
      const response = await this.dynamodb.query(params).promise();
      return response.Items.length > 0 ? response.Items : [];
    } catch (error) {
      if (error.code === "ResourceNotFoundException") {
        console.info(`${key}=${value} does not exist`);
      } else {
        console.error(`[Error on fetchItems] ${error}`);
      }
      return [];
    }
  }

  async __fetchItem(key, value) {
    const items = await this.fetchItems(key, value);
    return items.length > 0 ? items[0] : {};
  }

  async saveItem(item) {
    try {
      const params = {
        TableName: this.tableName,
        Item: AWS.DynamoDB.Converter.marshall(item),
      };
      await this.dynamodb.put(params).promise();
    } catch (error) {
      console.error(`[Error on saveItem] ${error}`);
    }
  }

  async mergeItem(item, retryCount = 0, MERGE_ITEM_MAX_RETRIES = 5) {
    let newItem = {};
    try {
      if (retryCount > MERGE_ITEM_MAX_RETRIES) {
        console.error(
          `Merge failed for ${JSON.stringify(item)} with ${retryCount} attempts`
        );
        return newItem;
      }

      const primaryKey = await this.primaryKey();
      const currentItem = await this.__fetchItem(primaryKey, item[primaryKey]);
      const currentVersion = currentItem.version || 0;
      newItem = this.__deepMerge(currentItem, item);
      newItem.version = currentVersion + 1;

      const params = {
        TableName: this.tableName,
        Item: AWS.DynamoDB.Converter.marshall(newItem),
        ConditionExpression:
          "attribute_not_exists(version) OR version = :currentVersion",
        ExpressionAttributeValues: { ":currentVersion": currentVersion },
      };
      await this.dynamodb.put(params).promise();
      return newItem;
    } catch (error) {
      if (error.code === "ConditionalCheckFailedException") {
        console.error(
          `Version mismatch for ${JSON.stringify(
            item
          )} with ${retryCount} attempts and version ${newItem.version}`
        );
        return this.mergeItem(newItem, retryCount + 1);
      } else {
        console.error(`[Error on mergeItem] ${error}`);
      }
    }
    return newItem;
  }

  async softMergeItem(item) {
    try {
      const primaryKey = await this.primaryKey();
      const updatableItem = { ...item };
      delete updatableItem[primaryKey];

      const updateExpression =
        "set " +
        Object.keys(updatableItem)
          .map((key) => `#attr_${key} = :${key}`)
          .join(", ");
      const expressionAttributeNames = Object.keys(updatableItem).reduce(
        (acc, key) => {
          acc[`#attr_${key}`] = key;
          return acc;
        },
        {}
      );
      const expressionAttributeValues = Object.keys(updatableItem).reduce(
        (acc, key) => {
          acc[`:${key}`] = updatableItem[key];
          return acc;
        },
        {}
      );

      const params = {
        TableName: this.tableName,
        Key: { [primaryKey]: item[primaryKey] },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "UPDATED_NEW",
      };
      const result = await this.dynamodb.update(params).promise();
      return { ...result.Attributes, [primaryKey]: item[primaryKey] };
    } catch (error) {
      console.error(`[Error on softMergeItem] ${error}`);
    }
  }

  async deleteItem(item) {
    try {
      const params = {
        TableName: this.tableName,
        Key: AWS.DynamoDB.Converter.marshall(item),
      };
      await this.dynamodb.delete(params).promise();
    } catch (error) {
      console.error(`[Error on deleteItem] ${error}`);
    }
  }

  __deepMerge(oldDict, newDict) {
    const result = { ...oldDict };
    for (const key in newDict) {
      if (newDict[key] === null) {
        continue;
      }
      if (typeof newDict[key] === "object" && !Array.isArray(newDict[key])) {
        result[key] = this.__deepMerge(oldDict[key] || {}, newDict[key]);
      } else {
        result[key] = newDict[key];
      }
    }
    return result;
  }
}

module.exports = DynamoDBConnector;
