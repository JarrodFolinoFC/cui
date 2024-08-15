import React from "react";
import { Card, Space } from "antd";

const accounts = [
  {
    name: "uat",
    link: "https://d-9367011135.awsapps.com/start/#/console?account_id=058180101585&role_name=EngineerNonProdElevated",
  },
  {
    name: "staging",
    link: "https://d-9367011135.awsapps.com/start/#/console?account_id=313303557381&role_name=EngineerProductionElevated",
  },
  {
    name: "staging_legacy",
    link: "https://d-9367011135.awsapps.com/start/#/console?account_id=253851610226&role_name=EngineerNonProdElevated",
  },
  {
    name: "prod",
    link: "https://d-9367011135.awsapps.com/start/#/console?account_id=341175100383&role_name=EngineerProductionElevated",
  },
  {
    name: "prod_legacy",
    link: "https://d-9367011135.awsapps.com/start/#/console?account_id=755865716437&role_name=EngineerProductionElevated",
  },
];

function AwsAccounts() {
  return (
    <Card title="AWS Accounts" style={{ width: 600 }}>
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
