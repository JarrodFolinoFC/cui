import { Spin } from "antd";
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
  const [count, setCount] = useState(null);

  function parseStreakFromLocalStorage() {
    return JSON.parse(localStorage.getItem(`Streak ${name}`) || "[]");
  }

  function updateStreak(newValue) {
    localStorage.setItem(`Streak ${name}`, JSON.stringify(newValue));
  }

    useEffect(() => {
      const streak = parseStreakFromLocalStorage(name);
      setCount(streak.length);
    }, [name]);

  return (
    <LongPressButton
      name={name}
      display={count}
      completedDisplay={count}
      oncomplete={() => {
        const streak = parseStreakFromLocalStorage();
        const today = getTodayDate();
        if (streak.includes(today)) {
          return;
        } else {
          streak.push(today);
          updateStreak(streak);
          setCount(streak.length);
        }
      }}
    />
  );
}

export default StreakTracker;
