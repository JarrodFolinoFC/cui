import React, { useState } from "react";
import { Card, Space, Input, Flex } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionOutlined,
} from "@ant-design/icons";

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

  function getIcon() {
    if (actual.toLowerCase() === value.toLowerCase()) {
      return <CheckCircleOutlined />;
    }
    if (isIncorrect(actual)) {
      return <CloseCircleOutlined />;
    }
    return <QuestionOutlined />;
  }

  return (
    <Space key={value}>
      <Input
        key={value}
        onChange={(e) => {
          setActual(e.target.value);
        }}
      />
      {getIcon()}
    </Space>
  );
}

function Recall({ title, concepts }) {
  return (
    <Card title={title} size="small">
      <Flex gap="middle" vertical>
        {concepts.map((concept, index) => {
          return (
            <div key={index}>
              <Concept value={concept} />
            </div>
          );
        })}
      </Flex>
    </Card>
  );
}

export default Recall;
