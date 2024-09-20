import "./App.css";
import { Tabs } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PersonalTabs from "./tabs/Personal";
import Planner from "./tabs/Planner";

import Mobile from "./pages/Mobile";

const items = [
  {
    key: "1",
    label: "Work",
    children: <Planner />,
  },
  {
    key: "2",
    label: "Personal",
    children: <PersonalTabs />,
  },
];

const isWorkingHours = () => {
  // Get the current date and time
  const now = new Date();

  // Convert the current time to London time
  const londonTime = now.toLocaleString("en-GB", { timeZone: "Europe/London" });
  const londonDate = new Date(londonTime);

  // Get the current day of the week (0 = Sunday, 6 = Saturday)
  const dayOfWeek = londonDate.getUTCDay();

  // Get the current hour and minute
  const hours = londonDate.getUTCHours();
  const minutes = londonDate.getUTCMinutes();

  // Check if the current day is between Monday (1) and Friday (5)
  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

  // Check if the current time is between 9:00 AM and 6:00 PM
  const isWithinWorkingHours =
    hours >= 9 && (hours < 18 || (hours === 18 && minutes === 0));

  // Return true if both conditions are met
  return isWeekday && isWithinWorkingHours;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Tabs
        defaultActiveKey={isWorkingHours() ? "1" : "2"}
        items={items}
        onChange={() => {}}
      />
    ),
  },
  {
    path: "/mobile",
    element: <Mobile />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
