import "./App.css";
import { Tabs, Flex } from "antd";

import Search from "./tabs/Search";
import Bookmarks from "./tabs/Bookmarks";
import DynamoDbCard from "./components/DynamoDbCard";
import AwsAccounts from "./tabs/AwsAccounts";
import Mindfullness from "./tabs/Mindfullness";
import Planner from "./tabs/Planner";

const items = [
  {
    key: "1",
    label: "Bookmarks",
    children: <Bookmarks />,
  },
  {
    key: "2",
    label: "Search",
    children: <Search />,
  },
  {
    key: "3",
    label: "AWS",
    children: (
      <Flex gap="middle">
        <AwsAccounts />
        <DynamoDbCard />
      </Flex>
    ),
  },
  {
    key: "4",
    label: "Mindfullness",
    children: <Mindfullness />,
  },
  {
    key: "5",
    label: "Planner",
    children: <Planner />,
  },
];

function App() {
  return <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />;
}

export default App;
