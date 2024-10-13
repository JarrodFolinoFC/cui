import React from "react";
import { Button, Space, Dropdown } from "antd";


import { DownOutlined } from "@ant-design/icons";
export default function Links({ links }) {
  function singleLink(link) {
    return (
      <Button size="small">
        <a href={link.url} target={link.name}>
          {link.name}
        </a>
      </Button>
    );
  }

  function multipleLinks(link) {
    return (
      <Dropdown
        size="small"
        menu={{
          items: link.collection.map((item) => {
            return {
              key: item.name,
              label: item.name,
              onClick: () => window.open(item.url, item.name),
            };
          }),
        }}
      >
        <Button>
          <Space>
            {link.description}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    );
  }

  return (
    <Space>
      {links.map((link) => {
        return link.type !== "collection"
          ? singleLink(link)
          : multipleLinks(link);
      })}
    </Space>
  );
}
