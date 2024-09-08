import { Card, Button, Modal, Flex } from "antd";
import { useState } from "react";

function PreviewCard({ title, preview, content, buttonLabel }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card title={title}>
      <Flex vertical>
        {preview}
        <Button onClick={() => setIsOpen(true)}>
          {buttonLabel || "Show More"}
        </Button>
      </Flex>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
      >
        {content}
      </Modal>
    </Card>
  );
}

export default PreviewCard;
