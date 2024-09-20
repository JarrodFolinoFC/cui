import { Line } from "@ant-design/plots";

function Graph({ data }) {

  const config = {
    data,
    xField: "date",
    yField: "minutes",
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
  };
  return (
    <Line {...config} />
  );
}

export default Graph;
