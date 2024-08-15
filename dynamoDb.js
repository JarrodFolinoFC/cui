// Import the AWS SDK
import AWS from "aws-sdk";

// Configure the AWS SDK with your region
AWS.config.update({ region: "eu-west-1" });

// Create a DynamoDB DocumentClient
const docClient = new AWS.DynamoDB.DocumentClient();

// Function to query the DynamoDB table
async function queryDynamoDB(tableName, indexName, keyConditionExpression, expressionAttributeValues, expressionAttributeNames) {
  const params = {
    TableName: tableName,
    IndexName: indexName, // Specify the index name
    KeyConditionExpression: keyConditionExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames, // Add attribute name mapping if necessary
  };

  try {
    const data = await docClient.query(params).promise();
    return data.Items;
  } catch (err) {
    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    throw err;
  }
}

// Example usage
(async () => {
  const tableName = "flexipay_pricing_users";
  const indexName = "line_of_credit_uuid"; // Specify the index name
  const keyConditionExpression = "#uuid = :uuidValue";
  const expressionAttributeValues = {
    ":uuidValue": "a36959d8-951e-42e2-b14e-3bd306314a6b",
  };

  // Add attribute name mapping if necessary
  const expressionAttributeNames = {
    "#uuid": "line_of_credit_uuid",
  };

  try {
    const results = await queryDynamoDB(
      tableName,
      indexName,
      keyConditionExpression,
      expressionAttributeValues,
      expressionAttributeNames
    );
    console.log("Query succeeded:", JSON.stringify(results, null, 2));
  } catch (err) {
    console.error("Error querying DynamoDB:", err);
  }
})();
