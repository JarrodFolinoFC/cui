import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import DaysUntil from "../components/DaysUntil";
import SimpleLineChart from "../components/SimpleLineChart";
import PreviewCard from "../components/PreviewCard";
import MarkdownCard from "../components/MarkdownCard";
import JsConsole from "../components/JsConsole";

const daysUntilData = [
  {
    date: "2024-09-10",
    description: "CT",
  },
  {
    date: "2024-09-14",
    description: "Renew Australian Passport",
  },
  {
    date: "2024-09-29",
    description: "New Zelda",
  },
];

const md = `
# Hello

## Some info

- tag(tag one)
- tag(tag two)

List
- a
- b
`;

function Planner() {
  return (
    <Flex wrap>
      <DaysUntil data={daysUntilData} />
      <SimpleLineChart
        unit="$"
        dataUrl={"http://localhost:5173/mortgage.json"}
      />
      <MarkdownCard title={"Some content"}>{md}</MarkdownCard>
      <JsConsole />
    </Flex>
  );
}

export default Planner;
