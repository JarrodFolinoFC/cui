import React, { useState, useEffect } from "react";
import { Card, Tag } from "antd";

const Prs = ({ name }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <Card title={name} size="small">
      {data &&
        data
          .flatMap((d) => {
            return d.prs;
          })
          .map((pr) => {
            return (
              <a href={pr.link}>
                <Tag>{pr.name}</Tag>
              </a>
            );
          })}
    </Card>
  );
};
export default Prs;
