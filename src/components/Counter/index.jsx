import React, { useState, useEffect } from "react";
import { Statistic, Card, Flex, Space } from "antd";

import { UpOutlined, DownOutlined } from "@ant-design/icons";

function Counter({ name }) {
  const [count, setCount] = useState(null);
  useEffect(() => {
    if (localStorage.getItem(`Counter ${name}`)) {
        setCount(Number(localStorage.getItem(`Counter ${name}`)));
    } else {
        setCount(0);
    }
  }, []);

  function saveCount(value) {
    localStorage.setItem(`Counter ${name}`, value);
    setCount(value);
  }

  return (
    <Card title="Counter" size="small">
      <Flex vertical>
        <Statistic title={name} value={count} precision={0} />
        <Space split>
          <UpOutlined onClick={() => saveCount(count + 1)} />
          <DownOutlined onClick={() => saveCount(count - 1)} />
        </Space>
      </Flex>
    </Card>
  );
}

export default Counter;
