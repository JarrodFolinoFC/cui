import { Card, Modal, Flex, Button } from "antd";
import { useState } from "react";

function ButtonModal({ title, contentUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{title}</Button>
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        footer={null}
      >
        {content}
      </Modal>
    </>
  );
}

function MultiPreviewCard({ title, data }) {
  return (
    <Card title={title} size="small">
      <Flex vertical>
        {data.map((item) => {
          <ButtonModal title={item.label} contentUrl={item.contentUrl} />;
        })}
      </Flex>
    </Card>
  );
}

export default MultiPreviewCard;
