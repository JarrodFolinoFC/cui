import React, { useState, useEffect } from "react";
import { List } from "antd";

import PreviewCard from "../PreviewCard";

function WorldClock() {
  const [times, setTimes] = useState(getTimes());
  function getTimes() {
    return [
      { region: "Europe/London", value: getTime("Europe/London") },
      { region: "Europe/Sofia", value: getTime("Europe/Sofia") },
      { region: "Australia/Melbourne", value: getTime("Australia/Melbourne") },
    ];
  }

  useEffect(() => {
    setInterval(() => {
      setTimes(getTimes());
    }, 60 * 1000);
  }, []);

  function getTime(format) {
    const currentTime = new Intl.DateTimeFormat("en-AU", {
      timeZone: format,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
    return currentTime;
  }
  return (
    <PreviewCard
      title="World Clock"
      content={
        <List
          itemLayout="horizontal"
          dataSource={times}
          renderItem={(time) => (
            <List.Item>
              <List.Item.Meta title={time.region} description={time.value} />
            </List.Item>
          )}
        />
      }
      preview={
        <List
          itemLayout="horizontal"
          dataSource={times}
          style={{ width: 180 }}
          renderItem={(time) => (
            <List.Item>
              <List.Item.Meta title={time.region} description={time.value} />
            </List.Item>
          )}
        />
      }
    />
  );
}

export default WorldClock;
