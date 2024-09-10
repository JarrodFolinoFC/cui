import React, { useState, useEffect } from "react";
import { Space, Card } from "antd";
import {
  GithubOutlined,
  PullRequestOutlined,
  CiCircleOutlined,
} from "@ant-design/icons";

const lookup = {
  Github: <GithubOutlined />,
  Pulls: <PullRequestOutlined />,
  CI: <CiCircleOutlined />,
};

const SshProject = ({ name }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5173/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <Card title={name} size="small" style={{ width: 200 }}>
      <Space>
        {data &&
          data
            .find((e) => {
              return e["name"] === name;
            })
            .links.map((link) => {
              return (
                <a href={link.link} target={link.name}>
                  {lookup[link.name]}
                </a>
              );
            })}
      </Space>
    </Card>
  );
};
export default SshProject;
