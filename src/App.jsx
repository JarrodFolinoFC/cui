import "./App.css";
import { Tabs, Flex } from "antd";

import Search from "./tabs/Search";
import Bookmarks from "./tabs/Bookmarks";
import DynamoDbCard from "./components/DynamoDbCard";

import Planner from "./tabs/Planner";

const items = [
  {
    key: "1",
    label: "Planner",
    children: <Planner />,
  },
  {
    key: "2",
    label: "Search",
    children: <Search />,
  },
];

function App() {
  return <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />;
}

export default App;
