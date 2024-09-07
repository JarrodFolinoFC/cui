import { Timeline } from "antd";



function DaysUntil({ data }) {
  function getDaysUntil(date) {
    const now = new Date();
    const then = new Date(date);
    const diff = then - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  return (
    <Timeline
      mode="left"
      items={data.map((item) => {
        return {
          label: `${getDaysUntil(item.date)} days`,
          children: item.description,
        };
      })}
    />
  );
}

export default DaysUntil;
