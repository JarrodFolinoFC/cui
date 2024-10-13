import React, { useState, useEffect } from "react";
import { Space, Card, Tag, List } from "antd";
import { CloudOutlined, CodeOutlined } from "@ant-design/icons";

const AwsLambdas = ({ name }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);


  return (
    <Card title={name} size="small">
      <List size="small">
        {data &&
          data
            .find((e) => {
              return e["name"] === name;
            })
            .cwlogs.map((log) => {
              return (
                <List.Item style={{ padding: 0 }}>
                  {log.name
                    .replace("fp_rewards_api_", "")
                    .replace("fp_pricing_api_", "")
                    .replace("fp_rap_shared_", "")}{" "}
                  <a href={log.link} target={log.name}>
                    <CloudOutlined />
                  </a>{" "}
                  <a href={log.lambda_link} target={log.name}>
                    <CodeOutlined />
                  </a>
                </List.Item>
              );
            })}
      </List>
    </Card>
  );
};
export default AwsLambdas;
