import React, { useState, useEffect } from "react";
import { List, Card, Space } from "antd";
import {
  GithubOutlined,
  PullRequestOutlined,
  CiCircleOutlined,
  IdcardOutlined
} from "@ant-design/icons";

const lookup = {
  Github: <GithubOutlined />,
  Pulls: <PullRequestOutlined />,
  CI: <CiCircleOutlined />,
  MyPrs: <IdcardOutlined />,
};

const SshProject = ({ name, repos }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5173/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <Card title={name} size="small" style={{ width: 200 }}>
      <List size="small">
        {repos.map((repo) => {
          return (
            <List.Item key={repo}>
              <Space>
                {repo}{" "}
                {data &&
                  data
                    .find((e) => {
                      return e["name"] === repo;
                    })
                    .links.map((link) => {
                      return (
                        <a href={link.link} target={link.name}>
                          {lookup[link.name]}
                        </a>
                      );
                    })}
              </Space>
            </List.Item>
          );
        })}
      </List>
    </Card>
  );
};
export default SshProject;
