import { Card, Modal, Flex, Button } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

function PreviewCard({ title, preview, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card
      title={title}
      size="small"
      style={{ minWidth: 300 }}
      extra={
        isOpen ? (
          <MinusCircleOutlined onClick={() => setIsOpen(false)} type="link" />
        ) : (
          <PlusCircleOutlined onClick={() => setIsOpen(true)} type="link" />
        )
      }
    >
      {isOpen ? (
        <Flex
          align="space-between"
          style={{ minWidth: 300 }}
          onClick={() => setIsOpen(false)}
        >
          {content}
        </Flex>
      ) : (
        <Flex
          align="space-between"
          style={{ minWidth: 300 }}
          onClick={() => setIsOpen(true)}
        >
          {preview}
        </Flex>
      )}
    </Card>
  );
}

export default PreviewCard;
