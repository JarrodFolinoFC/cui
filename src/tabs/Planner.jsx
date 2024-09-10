import React, { useState, useEffect } from "react";
import { Flex, Card, Tag } from "antd";
import DaysUntil from "../components/DaysUntil";
import SimpleLineChart from "../components/SimpleLineChart";
import MarkdownCard from "../components/MarkdownCard";
import JsConsole from "../components/JsConsole";
import UpcomingBirthdays from "../components/UpcomingBirthdays";
import WorldClock from "../components/WorldClock";
import Weather from "../components/Weather";
import Recall from "../components/Recall";
import AwsAccounts from "../components/AwsAccounts";
import StreakTracker from "../components/StreakTracker";
import Counter from "../components/Counter";
import MyTable from "../components/ReposTable";
import Repos from "../components/Repos";
import SshProject from "../components/SshProject";
import AwsLambdas from "../components/AwsLambdas";
import Prs from "../components/Prs";

const birthdays = [
  {
    date: "01-08",
    description: "Amy Kimpton",
  },
  {
    date: "01-25",
    description: "Sara",
  },
  {
    date: "01-25",
    description: "Ryan",
  },
  {
    date: "01-25",
    description: "Jodie",
  },
  {
    date: "06-06",
    description: "Britt",
  },
  {
    date: "08-22",
    description: "Mum",
  },
  {
    date: "10-04",
    description: "Me",
  },
  {
    date: "11-23",
    description: "Matthew Riley",
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
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5173/links.json")
      .then((res) => res.json())
      .then((data) => setLinks(data));
  }, []);
  return (
    <Flex wrap>
      <AwsAccounts />
      <StreakTracker name="Something" />
      <Counter name="Counter" />
      <SshProject name="flexipay-rewards-api" />
      <SshProject name="flexipay-pricing-api" />
      <SshProject name="flexipay-rewards-and-pricing-shared" />
      <Prs name="PRs" />

      <AwsLambdas name="flexipay-rewards-api" />
      <AwsLambdas name="flexipay-pricing-api" />
      <AwsLambdas name="flexipay-rewards-and-pricing-shared" />
      <Card title="Links" size="small">
        {links.map((link) => {
          return (
            <Tag>
              <a href={link.url} target={link.name}>
                {link.name}
              </a>
            </Tag>
          );
        })}
      </Card>
      {/* <MyTable /> */}

      <Repos />
      <DaysUntil data={daysUntilData} />
      <SimpleLineChart
        unit="$"
        dataUrl={"http://localhost:5173/mortgage.json"}
      />
      {/* <MarkdownCard title={"Some content"}>{md}</MarkdownCard> */}
      <JsConsole />
      <UpcomingBirthdays data={birthdays} />
      <WorldClock />
      <Weather location="London" latitude={52.52} longitude={13.41} />
      <Weather location="Sofia" latitude={42.6977} longitude={23.3219} />
      <Recall
        title="Aspects of Mindfullness"
        concepts={[
          "Focus",
          "Awareness",
          "Non Judgement",
          "Let Go",
          "Acceptance",
          "Patience",
          "Beginners Mind",
        ]}
      />
      <Recall
        title="Mind Traps"
        concepts={[
          "Blaming",
          "Tunnel Vision",
          "Catastrophizing",
          "Confirmation Bias",
          "Conformity",
          "Conclusions",
          "Sunk Costs",
        ]}
      />
      <Recall
        title="Seven Stages of Change"
        concepts={[
          "Pre Awareness",
          "Identification",
          "Preparation",
          "Action",
          "Maintenance",
          "Terminate",
          "Progress",
        ]}
      />
    </Flex>
  );
}

export default Planner;
