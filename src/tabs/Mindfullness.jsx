import { Space, Flex } from "antd";
import Recall from "../components/Recall";

function Mindfullness() {
  return (
    <Flex>
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

export default Mindfullness;
