import { useState, useEffect } from "react";

import { Card, Tag, Flex } from "antd";

import MyTable from "../components/ReposTable";

import Repos from "../components/Repos";


function Bookmarks() {
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
      <MyTable />

      <Repos />
    </>
  );
}

export default Bookmarks;
