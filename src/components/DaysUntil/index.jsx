import React, { useState, useEffect } from "react";

import { Timeline } from "antd";

import PreviewCard from "../PreviewCard";

function DaysUntil({ previewAmount = 3 }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5173/days_until.json")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

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
          items={data.slice(0, previewAmount).map((item) => {
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
