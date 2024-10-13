import React, { useState, useEffect } from "react";
import { Card, Tag, List, Modal, Flex } from "antd";

const Prs = ({ name, key }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <Flex>
      <Card title="Open PRs" size="small">
        <List size="small">
          {data &&
            data
              .flatMap((d) => {
                return d.prs;
              })
              .map((pr) => {
                return (
                  <a href={pr.link} target="new">
                    <List.Item style={{ padding: 0 }}>{pr.name}</List.Item>
                  </a>
                );
              })}
        </List>
      </Card>
      {[0, 5, 10, 15].map((i) => {
        return (
          <Card title={`${name} (${i})`} size="small">
            <List size="small">
              {data &&
                data
                  .flatMap((d) => {
                    return d.merged_prs;
                  })
                  .slice(i, i + 5)
                  .map((pr) => {
                    return (
                      <a href={pr.link} target="new">
                        <List.Item style={{ padding: 0 }}>{pr.name}</List.Item>
                      </a>
                    );
                  })}
            </List>
          </Card>
        );
      })}
    </Flex>
  );
};
export default Prs;
