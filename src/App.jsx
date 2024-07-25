import { useState } from "react";
import "./App.css";
import { Table, Space, Button } from "antd";
import {
  GithubOutlined,
  PullRequestOutlined,
  CiCircleOutlined,
} from "@ant-design/icons";

function App() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "links",
      render: (text) => <h4>{text}</h4>,
    },
    {
      title: "Links",
      dataIndex: "name",
      key: "links",
      render: (text) => (
        <Space>
          <a href={`https://github.com/FundingCircle/${text}`} target="_new">
            <GithubOutlined />
          </a>
          <a
            href={`https://github.com/FundingCircle/${text}/pulls`}
            target="_new"
          >
            <PullRequestOutlined />
          </a>
          <a
            href={`https://drone.fc-ops.com/FundingCircle/${text}`}
            target="_new"
          >
            <CiCircleOutlined />
          </a>
        </Space>
      ),
    },
    {
      title: "AWS",
      dataIndex: "aws",
      key: "aws",
      render: (text) => <a>{text}</a>,
    },
  ];

  const data = [
    {
      name: "flexipay-rewards-api",
      lambdas: [
        "fp_bc_cashback_user_enabled_get",
        "billing_bill_public_event_sink",
        "healthcheck_get",
        "line_of_credit_db_stream_receiver",
        "rewards_get",
        "rewards_user_post",
        "rewards_user_enabled_get",
      ],
    },
    {
      name: "uk-borrower-platform-rewards",
    },
    {
      name: "flexipay-billing-mock",
    },
    {
      name: "flexipay-rewards-end-to-end",
    },
    {
      name: "flexipay-pricing-api",
    },
    {
      name: "flexipay-pricing-api-end-to-end",
    },
    {
      name: "flexipay-rewards-and-pricing-shared",
    },
    {
      name: "rewards-and-pricing-db-migrator",
    },
    {
      name: "msk-cluster-uat",
    },
  ];

  const links = [
    {
      name: "Pricing extraction",
      url: "https://confluence.fundingcircle.com/display/RP/Pricing+extraction",
    },
    {
      name: "OKTA",
      url: "https://fundingcircle.okta.com/app/UserHome?session_hint=AUTHENTICATED",
    },
    {
      name: "Jira Board",
      url: "https://fundingcircle.atlassian.net/jira/software/c/projects/RAP/boards/715",
    },
    {
      name: "Gmail",
      url: "https://mail.google.com/mail/u/0/#inbox",
    },
    {
      name: "Confluence (RAP)",
      url: "https://confluence.fundingcircle.com/display/RP/Rewards+And+Pricing+Home",
    },
    {
      name: "OD",
      url: "https://diameter.fundingcircle.tech/?path=/docs/welcome-diameter--docs",
    },
    {
      name: "FC repos",
      url: "https://github.com/orgs/FundingCircle/repositories",
    },
    {
      name: "Calendar",
      url: "https://calendar.google.com/calendar/u/0/r",
    },
  ];

  return (
    <>
      {links.map((link) => (
        <Button key={link.name}>
          <a target="_blank" href={link.url}>
            {link.name}
          </a>
        </Button>
      ))}
      <Table columns={columns} dataSource={data} />
    </>
  );
}

export default App;