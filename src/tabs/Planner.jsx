import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import DaysUntil from "../components/DaysUntil";
import SimpleLineChart from "../components/SimpleLineChart";
import MarkdownCard from "../components/MarkdownCard";
import JsConsole from "../components/JsConsole";
import UpcomingBirthdays from "../components/UpcomingBirthdays";
import WorldClock from "../components/WorldClock";
import LongPressButton from "../components/LongPressButton";

const birthdays = [
  {
    date: "08-22",
    description: "Mum",
  },
  {
    date: "10-04",
    description: "Me",
  },
];

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
      <UpcomingBirthdays data={birthdays} />
      <WorldClock />
      <LongPressButton name="Something" display="88" completedDisplay={"89"} />
    </Flex>
  );
}

export default Planner;
