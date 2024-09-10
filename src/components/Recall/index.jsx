import React, { useState } from "react";
import { Card, Space, Input, Flex } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

function Concept({ value }) {
  const [actual, setActual] = useState("");

  function isIncorrect(given) {


    if (given.toLowerCase() === value.toLowerCase()) {
      return false;
    }
    if (given === "") {
      return false;
    }
    if (value.toLowerCase().includes(given.toLowerCase())) {
      return false;
    }
    return true;
  }

  return (
    <Space>
      <Input
        onChange={(e) => {
          setActual(e.target.value);
        }}
      />
      {actual.toLowerCase() === value.toLowerCase() && <CheckCircleOutlined />}
      {isIncorrect(actual) && <CloseCircleOutlined />}
    </Space>
  );
}

function Recall({ title, concepts }) {
  return (
    <Card title={title} size="small">
      <Flex gap="middle" vertical>
        {concepts.map((concept) => {
          return <Concept value={concept} />;
        })}
      </Flex>
    </Card>
  );
}

export default Recall;
