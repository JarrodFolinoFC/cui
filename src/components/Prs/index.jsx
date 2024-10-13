import React, { useState, useEffect } from "react";
import { Card, List } from "antd";

const Prs = ({ name, key }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <Card title={name} size="small">
      <List>
        {data &&
          data
            .flatMap((d) => {
              return d.prs;
            })
            .map((pr) => {
              return (
                <a href={pr.link} target="new">
                  <List.Item>{pr.name}</List.Item>
                </a>
              );
            })}
      </List>
    </Card>
  );
};
export default Prs;
