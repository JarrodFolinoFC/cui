import { Card, Modal, Flex } from "antd";
import { useState } from "react";

function PreviewCard({ title, preview, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card title={title} size="small">
      <Flex onClick={() => setIsOpen(true)} vertical>
        {preview}
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
