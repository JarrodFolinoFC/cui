import React from "react";
import { Card, Space, List } from "antd";
import { useState, useEffect } from "react";

function AwsAccounts() {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    fetch("/aws_accounts.json")
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
      <List size="small">
        {accounts.map((link) => {
          return (
            <List.Item>
              <a target="new" href={link.link}>
                {link.name}
              </a>
            </List.Item>
          );
        })}
      </List>
    </Card>
  );
}

export default AwsAccounts;
