import React, { useState, useEffect } from "react";
import { Card, Space, Tag } from "antd";
import {
  GithubOutlined,
  PullRequestOutlined,
  CiCircleOutlined,
  IdcardOutlined,
} from "@ant-design/icons";

const lookup = {
  Github: <GithubOutlined />,
  Pulls: <PullRequestOutlined />,
  CI: <CiCircleOutlined />,
  MyPrs: <IdcardOutlined />,
};
function Repos() {
  const [other, setOther] = useState([]);

  useEffect(() => {
    fetch("/other.json")
      .then((res) => res.json())
      .then((data) => setOther(data));
  }, []);

  return (
    <Card title="Repos" size="small">
      {other.map((data) => {
        return (
          <Tag>
            <Space>
              {data.name}{" "}
              {data.links.map((link) => {
                return (
                  <a href={link.link} target={link.name}>
                    {lookup[link.name]}
                  </a>
                );
              })}
            </Space>
          </Tag>
        );
      })}
    </Card>
  );
}

export default Repos;
