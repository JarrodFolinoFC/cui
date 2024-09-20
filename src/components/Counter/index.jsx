import React, { useState, useEffect } from "react";
import { Statistic, Card, Flex, Space, Button, Spin } from "antd";

import { UpOutlined, DownOutlined } from "@ant-design/icons";

import MirrorStorage from "../../utils/mirrorStorage";
import asyncLocalStorage from "../../utils/asyncLocalStorage";

const URL = "https://wz17dd6el1.execute-api.eu-west-1.amazonaws.com/v1/storage";

const mirrorStorage = new MirrorStorage(URL, "aaaa");

function Counter({ name, storageDriver = asyncLocalStorage }) {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const item = await storageDriver.getItem(name);
        if (item) {
          setCount(Number(JSON.parse(item).count));
        } else {
          await storageDriver.setItem(name, JSON.stringify({ count: 0 }));
          setCount(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [name]);

  function saveCount(value) {
    storageDriver.setItem(name, JSON.stringify({ count: value }));
    setCount(value);
  }

  function decrement() {
    if (count - 1 >= 0) {
      saveCount(count - 1);
    }
  }

  return (
    <Card title={name} size="small">
      <Flex vertical>
        {count !== null ? <Statistic value={count} precision={0} /> : <Spin />}
        <Space>
          <Button onClick={() => saveCount(count + 1)}>
            <UpOutlined />
          </Button>
          <Button onClick={decrement}>
            <DownOutlined />
          </Button>
        </Space>
      </Flex>
    </Card>
  );
}

export default Counter;
