import React from "react";
import { IndexBar, List } from "antd-mobile";

import DaysUntil from "../components/DaysUntil";
import Recall from "../components/Recall";
import Todo from "../components/Todo";
import MetricTracker from "../components/MetricTracker";
import CoinFlip from "../components/CoinFlip";
import CountriesVisited from "../components/CountriesVisited";
import StreakTracker from "../components/StreakTracker";
import Counter from "../components/Counter";
import CurrencyConvertor from "../components/CurrencyConvertor";
import SimpleLineChart from "../components/SimpleLineChart";
import UpcomingBirthdays from "../components/UpcomingBirthdays";
import PomodoroTimer from "../components/PomodoroTimer";
import Weather from "../components/Weather";
import Backup from "../components/Backup";
import Restore from "../components/Restore";

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
  { name: "Restore", components: [<Restore />] },
  { name: "Backup", components: [<Backup />] },
  {
    name: "Weather",
    components: [
      <Weather
        location="London"
        latitude={52.52}
        longitude={13.41}
        timeInfo="Europe/London"
      />,
    ],
  },
  {
    name: "PomodoroTimer",
    components: [<PomodoroTimer />],
  },
  { name: "Todo", components: [<Todo />, <Todo name="TechBooks" />] },
  {
    name: "Counters",
    components: [
      <Counter name="Recall Activity" />,
      <Counter name="Meditate" />,
      <Counter name="Lower Back Stability" />,
    ],
  },
  {
    name: "StreakTracker",
    components: [
      <StreakTracker name="Mindfullness Walk" />,
      <StreakTracker name="Brush Teeth" />,
    ],
  },
  { name: "Coinflip", components: [<CoinFlip />] },
  { name: "CountriesVisited", components: [<CountriesVisited />] },
  { name: "DaysUntil", components: [<DaysUntil />] },
  { name: "MetricTracker", components: [<MetricTracker name="runs" />] },
  {
    name: "CurrencyConvertor",
    components: [<CurrencyConvertor baseCurrency={"USD"} />],
  },
  { name: "Recall", components: [recalls] },
  { name: "UpcomingBirthdays", components: [<UpcomingBirthdays />] },
  {
    name: "SimpleLineChart",
    components: [
      <SimpleLineChart
        unit="$"
        dataUrl={"http://localhost:5173/mortgage.json"}
      />,
    ],
  },
];

export default () => {
  return (
    <div style={{ height: window.innerHeight }}>
      <IndexBar>
        {sections.map((section) => {
          return (
            <IndexBar.Panel
              index={section.name}
              title={section.name}
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
