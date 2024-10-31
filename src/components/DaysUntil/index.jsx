import React, { useState, useEffect } from "react";

import { Flex, Timeline, List, Typography } from "antd";

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const suffix = getDaySuffix(day);
    return `${day}${suffix} ${month}`;
  }

  function getDaySuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  function getDayOfWeek(date) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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
      return (
        <div>
          <Flex vertical gap={8} wrap="wrap">
            <div>
              {`${getDayOfWeek(item.date)} ${formatDate(item.date)}`} (
              {getDaysUntil(item.date)} days)
            </div>

            <div>{item.description}</div>
          </Flex>
        </div>
      );
    });
  }

  return (
    <PreviewCard
      title="Days Until"
      content={
        <List
          dataSource={getData(data, hide)}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      }
      preview={
        <List
          dataSource={getData(data, hide, 4)}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      }
    />
  );
}

export default DaysUntil;
