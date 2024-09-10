import React from "react";
import { Card, Space } from "antd";
import { useState, useEffect } from "react";

function AwsAccounts() {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5173/aws_accounts.json")
      .then((response) => response.json())
      .then((data) => {
        setAccounts(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);
  return (
    <Card title="AWS Accounts" size="small">
      <Space>
        {accounts.map((link) => {
          return (
            <a target="new" href={link.link}>
              {link.name}
            </a>
          );
        })}
      </Space>
    </Card>
  );
}

export default AwsAccounts;
