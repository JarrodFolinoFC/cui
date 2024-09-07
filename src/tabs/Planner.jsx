import { Space, Flex } from "antd";
import DaysUntil from "../components/DaysUntil";

const data = [
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

function Planner() {
  return (
    <Flex>
      <DaysUntil data={data} />
    </Flex>
  );
}

export default Planner;
