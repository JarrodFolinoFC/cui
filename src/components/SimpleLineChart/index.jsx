import { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";

import PreviewCard from "../PreviewCard";

function SimpleLineChart({ dataUrl, unit = null }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(dataUrl)
      .then((res) => res.json())
      .then((data) => {
        // Sort the data by date
        const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setData(sortedData);
      });
  }, [dataUrl]);

  
  const config = {
    data,
    xField: "date",
    yField: "amount",
    point: {
      shapeField: "circle",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
    colorField: 'category'
  };
  return (
    <PreviewCard
      title="Amount Owed"
      content={<Line {...config} />}
      preview={`${unit}${data && data[data.length - 1].amount}`}
      buttonLabel={`View Graph`}
    />
  );
}

export default SimpleLineChart;
