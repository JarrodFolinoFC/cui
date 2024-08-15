import React from "react";
import { Table, Tag } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <h4>{text}</h4>,
  },
  {
    title: "Logs",
    key: "cwlogs",
    render: (_, record) =>
      record.cwlogs.map((log) => {
        return (
          <a href={log.link} target="_new">
            <Tag>{log.name}</Tag>
          </a>
        );
      }),
  },
  {
    title: "Lambdas",
    key: "lambdas",
    render: (_, record) =>
      record.cwlogs.map((lambda) => {
        return (
          <a href={lambda.link} target="_new">
            <Tag>{lambda.name}</Tag>
          </a>
        );
      }),
  },
];
const data = [
  {
    key: "1",
    name: "fp_rewards_api",
    links: [
      {
        name: "CI",
        link: "https://drone.fc-ops.com/FundingCircle/flexipay-rewards-api",
      },
      {
        name: "Github",
        link: "https://github.com/FundingCircle/flexipay-rewards-api",
      },
    ],
    lambdas: [
      {
        name: "fp_rewards_api_rewards_redeem_post",
        link: "https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions/fp_rewards_api_rewards_redeem_post",
      },
      {
        name: "fp_rewards_api_healthcheck_get",
        link: "https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions/fp_rewards_api_healthcheck_get",
      },
      {
        name: "fp_rewards_api_rewards_get",
        link: "https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions/fp_rewards_api_rewards_get",
      },
      {
        name: "fp_rewards_api_billing_bill_public_event_sink",
        link: "https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions/fp_rewards_api_billing_bill_public_event_sink",
      },
      {
        name: "fp_rewards_api_rewards_user_enabled_get",
        link: "https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions/fp_rewards_api_rewards_user_enabled_get",
      },
      {
        name: "fp_rewards_api_rewards_user",
        link: "https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1#/functions/fp_rewards_api_rewards_user",
      },
    ],
    cwlogs: [
      {
        name: "fp_rewards_api_rewards_redeem_post",
        link: "https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Ffp_rewards_api_rewards_redeem_post",
      },
      {
        name: "fp_rewards_api_healthcheck_get",
        link: "https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Ffp_rewards_api_healthcheck_get",
      },
      {
        name: "fp_rewards_api_rewards_get",
        link: "https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Ffp_rewards_api_rewards_get",
      },
      {
        name: "fp_rewards_api_billing_bill_public_event_sink",
        link: "https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Ffp_rewards_api_billing_bill_public_event_sink",
      },
      {
        name: "fp_rewards_api_rewards_user_enabled_get",
        link: "https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Ffp_rewards_api_rewards_user_enabled_get",
      },
      {
        name: "fp_rewards_api_rewards_user",
        link: "https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#logsV2:log-groups/log-group/$252Faws$252Flambda$252Ffp_rewards_api_rewards_user",
      },
    ],
  },
];
const MyTable = () => <Table columns={columns} dataSource={data} />;
export default MyTable;
