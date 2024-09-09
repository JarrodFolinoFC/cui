import React, { useState } from "react";
import { Progress, Flex, Space } from "antd";
import { Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";

const { Title } = Typography;
const DURATION = 10;

function LongPressButton({
  name,
  display,
  completedDisplay,
  oncomplete = null,
}) {
  const [progressUpdater, setProgressUpdater] = useState(null);
  const [percent, setPercent] = useState(0);
  const [completed, setCompleted] = useState(false);

  const clearTimer = () => {
    clearInterval(progressUpdater);
    setPercent(0);
  };

  const longPress = () => {
    setProgressUpdater(
      setInterval(() => {
        setPercent((percent) => {
          if (percent < 100) {
            return percent + 1;
          } else if (percent === 100) {
            setCompleted(true);
            oncomplete && oncomplete();
            return 100;
          }
        });
      }, DURATION)
    );
  };

  function format() {
    return completed ? completedDisplay : display;
  }
  return (
    <Flex
      vertical
      onMouseDown={longPress}
      onMouseUp={clearTimer}
      onMouseOut={clearTimer}
    >
      <Title level={3}>{name}</Title>
      <Progress
        format={format}
        type="circle"
        percent={completed ? 100 : percent}
      />
    </Flex>
  );
}

export default LongPressButton;
