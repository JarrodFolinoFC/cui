import { Flex, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import LongPressButton from "../LongPressButton";

import asyncLocalStorage from "../../utils/asyncLocalStorage";

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function StreakTracker({ name, storageDriver = localStorage }) {
  const [streak, setStreak] = useState(null);
  const today = getTodayDate();

  function updateStreak() {
    if (streak.includes(today)) {
      return;
    } else {
      const newValue = [...streak, today];
      setStreak(newValue);
      storageDriver.setItem(`#Streak#${name}`, JSON.stringify(newValue));
    }
  }

  useEffect(() => {
    const fetchData = () => {
      try {
        const data = storageDriver.getItem(`#Streak#${name}`);
        setStreak(JSON.parse(data || '[]'));
      } catch (error) {
        alert("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    streak && (
      <Row gutter={1} align="middle">
        <Col span={6}>{name}</Col>
        <Col span={6}>
          <LongPressButton
            name={name}
            display={streak && streak.length}
            completedDisplay={streak && streak.length}
            isComplete={streak && streak.includes(today)}
            oncomplete={updateStreak}
          />
        </Col>
      </Row>
    )
  );
}

export default StreakTracker;
