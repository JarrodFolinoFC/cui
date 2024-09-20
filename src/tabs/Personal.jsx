import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import DaysUntil from "../components/DaysUntil";
import SimpleLineChart from "../components/SimpleLineChart";
import UpcomingBirthdays from "../components/UpcomingBirthdays";
import Recall from "../components/Recall";
import StreakTracker from "../components/StreakTracker";
import Counter from "../components/Counter";
import CurrencyConvertor from "../components/CurrencyConvertor";
import Todo from "../components/Todo";
import MetricTracker from "../components/MetricTracker";
import CoinFlip from "../components/CoinFlip";
import CountriesVisited from "../components/CountriesVisited";

const daysUntilData = [
  {
    date: "2024-09-14",
    description: "Renew Australian Passport",
  },
  {
    date: "2024-10-27",
    description: "Twilight",
  },
];
function PersonalTabs() {
  return (
    <Flex wrap gap="4px" vertical>
      <Flex wrap>
        <Todo />
        <DaysUntil data={daysUntilData} />
        <CoinFlip />
        <CountriesVisited />
      </Flex>
      <Flex wrap>
        <MetricTracker name={"runs"}/>
        <StreakTracker name="Mindfullness Walk" />
        <StreakTracker name="Brush Teeth" />
        <Counter name="Recall Activity" />
        <Counter name="Meditate" />
        <Counter name="Lower Back Stability" />
      </Flex>
      <Flex>
        <Flex wrap vertical>
          <UpcomingBirthdays previewCount={4} />
        </Flex>
        <Flex wrap vertical>
          <CurrencyConvertor baseCurrency="AUD" />
          <SimpleLineChart
            unit="$"
            dataUrl={"http://localhost:5173/mortgage.json"}
          />
        </Flex>

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
    </Flex>
  );
}

export default PersonalTabs;
