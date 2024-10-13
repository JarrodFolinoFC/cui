import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Planner from "./pages/Planner";
import MarkdownCard from "./components/MarkdownCard";
import Mobile from "./pages/Mobile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Planner />,
  },
  {
    path: "/mobile",
    element: <Mobile />,
  },
  {
    path: "/shortcuts",
    element: (
      <MarkdownCard
        title={"General"}
        urls={[
          "/md/vscode_general_basic.md",
          "/md/vscode_search_select.md",
          "/md/vscode_other.md",
        ]}
      />
    )
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
