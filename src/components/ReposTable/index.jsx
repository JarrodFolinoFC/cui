import React, { useState, useEffect } from "react";
import { Table, Tag, Space } from "antd";
import {
  CodeOutlined,
  CloudOutlined,
} from "@ant-design/icons";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <h4>{text}</h4>,
  },
  {
    title: "PRs",
    key: "prs",
    render: (_, record) =>
      record.prs.map((link) => {
        return (
          <a href={link.link} target="_new">
            <Tag>{link.name}</Tag>
          </a>
        );
      }),
  },
  {
    title: "AWS Resources",
    key: "cwlogs",
    render: (_, record) =>
      record.cwlogs.map((log) => {
        return (
          <Tag>
            <Space>
              {log.name
                .replace("fp_rewards_api_", "")
                .replace("fp_pricing_api_", "")
                .replace("fp_rap_shared_", "")}

              <a href={log.link} target={log.name}>
                <CloudOutlined />
              </a>
              <a href={log.lambda_link} target={log.name}>
                <CodeOutlined />
              </a>
            </Space>
          </Tag>
        );
      }),
  },
];

const MyTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5173/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);
  return <Table columns={columns} dataSource={data} />;
};
export default MyTable;
