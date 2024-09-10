import { Timeline } from "antd";

import PreviewCard from "../PreviewCard";

function UpcomingBirthdays({ data }) {
  function getTodayDateMMDD() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${month}-${day}`;
  }

  function addYear(mmdd) {
    return `2024-${mmdd}`;
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

  return (
    <PreviewCard
      title="Birthdays"
      content={
        <Timeline
          mode="left"
          items={data.map((item) => {
            const fullDate = addYear(item.date);
            return {
              label: `${fullDate} (${getDaysUntil(fullDate)} days)`,
              children: item.description,
            };
          })}
        />
      }
      preview={
        <Timeline
          mode="left"
          style={{ "min-width": 200 }}
          items={data
            .filter(filterAfterToday)
            .slice(0, 2)
            .map((item) => {
              const fullDate = addYear(item.date);
              return {
                label: `${getDaysUntil(fullDate)} days`,
                children: item.description,
              };
            })}
        />
      }
    />
  );
}

export default UpcomingBirthdays;
