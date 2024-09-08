import { Timeline, Card, Button, Modal } from "antd";
import { useState } from "react";

import PreviewCard from "../PreviewCard";

function DaysUntil({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  function getDaysUntil(date) {
    const now = new Date();
    const then = new Date(date);
    const diff = then - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  return (
    <PreviewCard
      title="Days Until"
      content={
        <Timeline
          mode="left"
          items={data.map((item) => {
            return {
              label: `${getDaysUntil(item.date)} days`,
              children: item.description,
            };
          })}
        />
      }
      preview={
        <Timeline
          mode="left"
          items={data.slice(0, 2).map((item) => {
            return {
              label: `${getDaysUntil(item.date)} days`,
              children: item.description,
            };
          })}
        />
      }
    />
  );
}

export default DaysUntil;
