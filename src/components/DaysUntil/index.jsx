import React, { useState, useEffect } from "react";

import { Timeline } from "antd";

import PreviewCard from "../PreviewCard";

function DaysUntil({ previewAmount = 3, hideSensitive = true }) {
  const [data, setData] = useState([]);
  let [hide, setHide] = useState(hideSensitive);

  useEffect(() => {
    fetch("/days_until.json")
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

  function getDayOfWeek(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date(date);
    return days[d.getDay()];

  }

  function getData(data, hide, count) {
    if (hide === true) {
      data = data.filter((d) => {
        return d.hidden !== true;
      });
    }

    return data.slice(0, count).map((item) => {
      return {
        label: (
          <>
            <div>
              {getDayOfWeek(item.date)}
               {item.date}
            </div>
            <div>{getDaysUntil(item.date)} days</div>
          </>
        ),
        children: item.description,
      };
    });
  }

  return (
    <PreviewCard
      title="Days Until"
      content={<Timeline  mode="left" items={getData(data, hide, 100)} />}
      preview={
        <Timeline mode="left" items={getData(data, hide, previewAmount)} />
      }
    />
  );
}

export default DaysUntil;
