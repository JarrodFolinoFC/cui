import { Modal } from "antd";
import { useState } from "react";

function PreviewCard({ title, preview, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{preview}</div>

      <Modal
        title={title}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={null}
      >
        {content}
      </Modal>
    </>
  );
}

export default PreviewCard;
