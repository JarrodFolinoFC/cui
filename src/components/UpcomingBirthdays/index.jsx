import { useState, useEffect } from "react";
import { Timeline } from "antd";

import PreviewCard from "../PreviewCard";

function UpcomingBirthdays({ previewCount = 6 }) {
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5173/birthdays.json")
      .then((response) => response.json())
      .then((data) => {
        setBirthdays(data);
      });
  }, []);

  function getTodayDateMMDD() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${month}-${day}`;
  }

  function addYear(mmdd) {
    const [month, day] = mmdd.split("-").map(Number);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // getMonth() returns 0-11
    const currentDay = now.getDate();

    let year = currentYear;
    if (month < currentMonth || (month === currentMonth && day < currentDay)) {
      year += 1;
    }

    return `${year}-${mmdd}`;
  }

  function filterAfterToday(date) {
    return date.date >= getTodayDateMMDD();
  }

  function getDaysUntil(date) {
    const now = new Date();
    const then = new Date(date);
    const diff = then - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  function isLeapYear(year) {
    if (year % 4 !== 0) return false;
    if (year % 100 !== 0) return true;
    if (year % 400 !== 0) return false;
    return true;
  }

  return (
    <PreviewCard
      title="Birthdays"
      content={
        <Timeline
          mode="left"
          items={birthdays
            .map((item) => {
              const fullDate = addYear(item.date);
              return {
                days: getDaysUntil(fullDate),
                label: `${getDaysUntil(fullDate)} days`,
                children: item.description,
              };
            })
            .sort((a, b) => a.days - b.days)}
        />
      }
      preview={
        <Timeline
          mode="left"
          items={birthdays
            .filter(filterAfterToday)
            .slice(0, previewCount)
            .map((item) => {
              const fullDate = addYear(item.date);
              return {
                days: getDaysUntil(fullDate),
                label: `${getDaysUntil(fullDate)} days`,
                children: item.description,
              };
            })
            .sort((a, b) => a.days - b.days)}
        />
      }
    />
  );
}

export default UpcomingBirthdays;
