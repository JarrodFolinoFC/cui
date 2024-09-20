import { Card } from "antd";
import React, { useEffect, useState } from "react";
import LongPressButton from "../LongPressButton";

import asyncLocalStorage from "../../utils/asyncLocalStorage";

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function StreakTracker({ name, storageDriver = asyncLocalStorage }) {
  const [streak, setStreak] = useState(null);
  const today = getTodayDate();

  async function updateStreak() {
    if (streak.includes(today)) {
      return;
    } else {
      const newValue = [...streak, today];
      setStreak(newValue);
      storageDriver.setItem(`Streak_${name}`, JSON.stringify(newValue));
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await storageDriver.getItem(`Streak_${name}`);
        if (data) {
          setStreak(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [name]);

  return (
    streak && (
      <Card title={name} size="small">
        <LongPressButton
          name={name}
          display={streak && streak.length}
          completedDisplay={streak && streak.length}
          isComplete={streak && streak.includes(today)}
          oncomplete={updateStreak}
        />
      </Card>
    )
  );
}

export default StreakTracker;
