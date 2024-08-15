import React, { useState } from "react";
import { Card, Space, Input } from "antd";
import { TableOutlined, FileTextOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";

const dbTables = [
  "flexipay_rewards_and_pricing_lines_of_credit",
  "flexipay_pricing_users",
  "flexipay_rewards_bills",
  "flexipay_rewards_users",
  "flexipay_rewards_earned",
  "flexipay_rewards_redeemed",
  "flexipay_rewards_bills",
];

function DynamoDbCard() {
  const [loc, setLoc] = useState(null);
  return (
    <Card title="DynamoDB Tables" style={{ width: 600 }}>
      LOC: <Input onChange={(e) => setLoc(e.target.value)} />
      {dbTables.map((table) => (
        <Space>
          {table.replace("flexipay_", "")}
          <a
            target={table}
            href={`https://eu-west-1.console.aws.amazon.com/dynamodbv2/home?region=eu-west-1#table?name=${table}`}
          >
            <TableOutlined />
          </a>
          <a
            target={table}
            href={`https://eu-west-1.console.aws.amazon.com/dynamodbv2/home?region=eu-west-1#item-explorer?maximize=true&table=${table}`}
          >
            <FileTextOutlined />
          </a>
          <a
            target="new"
            href={`https://eu-west-1.console.aws.amazon.com/dynamodbv2/home?region=eu-west-1#edit-item?itemMode=2&pk=${loc}&route=ROUTE_ITEM_EXPLORER&sk=&table=${table}`}
          >
            <SearchOutlined />
          </a>
        </Space>
      ))}
    </Card>
  );
}

export default DynamoDbCard;
