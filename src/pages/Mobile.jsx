import React from "react";
import { IndexBar, List } from "antd-mobile";
import { Space, Row, Col } from "antd";

import DaysUntil from "../components/DaysUntil";
import Recall from "../components/Recall";
import Todo from "../components/Todo";
import MetricTracker from "../components/MetricTracker";
import MetricTrackerDisplay from "../components/MetricTrackerDisplay";
import MetricTrackerVisual from "../components/MetricTrackerVisual";
import CoinFlip from "../components/CoinFlip";
import CountriesVisited from "../components/CountriesVisited";
import StreakTracker from "../components/StreakTracker";
import Counter from "../components/Counter";
import CurrencyConvertor from "../components/CurrencyConvertor";
import UpcomingBirthdays from "../components/UpcomingBirthdays";
import Weather from "../components/Weather";
import Backup from "../components/Backup";
import LongPressButton from "../components/LongPressButton";
import PomodoroTimer from "../components/PomodoroTimer";
import SimpleLineChart from "../components/SimpleLineChart";

import {
  UploadOutlined,
  CloudOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
  NumberOutlined,
  FireOutlined,
  PoundCircleOutlined,
  GlobalOutlined,
  CalendarOutlined,
  RightOutlined,
  TransactionOutlined,
  HomeOutlined,
  TrademarkCircleOutlined,
  GiftOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

const recalls = [
  <Recall
    title="Conversations"
    concepts={[
      "History",
      "Philosphy",
      "Metaphor",
      "Specific",
      "Broad",
      "Related",
      "Emotion",
      "Detail",
      "Restatements",
    ]}
  />,
  <Recall
    title="Rules"
    concepts={[
      "Thought Experiment",
      "Reactions",
      "Effective Compliments",
      "No absolutes",
      "Double Explanations",
      "Break the fourth wall",
      "Boundaries",
      "Derail",
      "Free Association",
      "Make them an expert",
      "What were you saying",
    ]}
  />,
  <Recall
    title="Conversation Main Emotions"
    concepts={["Joy", "Anger", "Annoyance", "Sadness", "Humour"]}
  />,
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
  />,

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
  />,

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
  />,
];

const sections = [
  {
    name: "Counters",
    components: [
      <Counter names={["Drink Water", "Pilates Workout", "Smoothie"]} />,
    ],
    icon: <NumberOutlined />,
  },
  {
    name: "Runs",
    components: [
      <MetricTracker name="runs" />,
      <MetricTrackerDisplay name="runs" />,
      <MetricTrackerVisual name="runs" />,
    ],
    icon: <RightOutlined />,
  },
  {
    name: "Streaks",
    components: [<StreakTracker name="DrinkWater" />],
    icon: <FireOutlined />,
  },

  {
    name: "Weather",
    components: [
      <Weather
        location="London"
        latitude={52.52}
        longitude={13.41}
        timeInfo="Europe/London"
      />,
      <Weather
        location="Melbourne"
        latitude={-37.8136}
        longitude={144.9631}
        timeInfo={"Australia/Melbourne"}
      />,
    ],
    icon: <CloudOutlined />,
  },
  {
    name: "Todo",
    components: [<Todo />, <Todo name="TechBooks" />],
    icon: <UnorderedListOutlined />,
  },
  {
    name: "Coinflip",
    components: [<CoinFlip />],
    icon: <PoundCircleOutlined />,
  },
  {
    name: "CountriesVisited",
    components: [<CountriesVisited />],
    icon: <GlobalOutlined />,
  },

  {
    name: "CurrencyConvertor",
    components: [<CurrencyConvertor baseCurrency={"AUD"} />],
    icon: <TransactionOutlined />,
  },
  {
    name: "DaysUntil",
    components: [<DaysUntil hideSensitive={true} />],
    icon: <CalendarOutlined />,
  },

  // { name: "Recall", components: [recalls], icon: <TrademarkCircleOutlined /> },
  {
    name: "UpcomingBirthdays",
    components: [<UpcomingBirthdays />],
    icon: <GiftOutlined />,
  },
  // {
  //   name: "PomodoroTimer",
  //   components: [<PomodoroTimer />],
  //   icon: <ClockCircleOutlined />,
  // },
  { name: "Backup", components: [<Backup />], icon: <DownloadOutlined /> },

  // {
  //   name: "SimpleLineChart",
  //   components: [<SimpleLineChart unit="$" dataUrl={"/mortgage.json"} />],
  //   icon: <HomeOutlined />,
  // },
];

export default () => {
  return (
    <div style={{ height: window.innerHeight }}>
      <IndexBar>
        {sections.map((section) => {
          return (
            <IndexBar.Panel
              brief={section?.icon || section.name}
              index={section.name}
              title={
                <Space>
                  {section?.icon}
                  {section.name}
                </Space>
              }
              key={section.name}
            >
              <List>
                {section.components.map((component, i) => {
                  return <List.Item key={section.name}>{component}</List.Item>;
                })}
              </List>
            </IndexBar.Panel>
          );
        })}
      </IndexBar>
    </div>
  );
};
