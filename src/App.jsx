import { useState, useEffect } from "react";
import "./App.css";
import { Card, Tag, Flex } from "antd";

import MyTable from "./MyTable";
import DynamoDbCard from "./DynamoDbCard";
import AwsAccounts from "./AwsAccounts";
import Repos from "./Repos";

function App() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5173/links.json")
      .then((res) => res.json())
      .then((data) => setLinks(data));
  });

  return (
    <>
      <Card title="Links" style={{ width: "100%" }}>
        {links.map((link) => {
          return (
            <Tag>
              <a href={link.url} target={link.name}>
                {link.name}
              </a>
            </Tag>
          );
        })}
      </Card>
      <Repos />
      <Flex gap="middle">
        <AwsAccounts />
        <DynamoDbCard />
      </Flex>
      <MyTable />
    </>
  );
}

export default App;
