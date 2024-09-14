import { Card } from "antd";
import React, { useEffect, useState } from "react";
import LongPressButton from "../LongPressButton";

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function StreakTracker({ name }) {
  const [streak, setStreak] = useState(null);
  const today = getTodayDate();

  function parseStreakFromLocalStorage() {
    return JSON.parse(localStorage.getItem(`Streak ${name}`) || "[]");
  }

  function updateStreak(newValue) {
    localStorage.setItem(`Streak ${name}`, JSON.stringify(newValue));
    setStreak(localStorage.getItem(`Streak ${name}`));
  }

  useEffect(() => {
    const streak = parseStreakFromLocalStorage(name);
    setStreak(streak);
  }, [name]);

  return (
    streak && (
      <Card title={name} size="small">
        <LongPressButton
          name={name}
          display={streak && streak.length}
          completedDisplay={streak && streak.length}
          isComplete={streak && streak.includes(today)}
          oncomplete={() => {
            const streak = parseStreakFromLocalStorage();

            if (streak.includes(today)) {
              return;
            } else {
              streak.push(today);
              updateStreak(streak);
            }
          }}
        />
      </Card>
    )
  );
}

export default StreakTracker;
