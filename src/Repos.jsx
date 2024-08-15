import React, { useState, useEffect } from "react";
import { Card, Space, Tag } from "antd";
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
function Repos() {
  const [other, setOther] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5173/other.json")
      .then((res) => res.json())
      .then((data) => setOther(data));
  });

  return (
    <Card title="Repos" style={{ width: "100%" }}>
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
