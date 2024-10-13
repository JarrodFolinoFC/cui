import React, { useState } from "react";
import { Progress, Flex } from "antd";

const DURATION = 4;

function LongPressButton({
  display,
  completedDisplay,
  isComplete,
  oncomplete = null,
}) {
  const [progressUpdater, setProgressUpdater] = useState(null);
  const [percent, setPercent] = useState(0);
  const [completed, setCompleted] = useState(isComplete);

  const clearTimer = () => {
    if (completed) {
      return;
    }
    clearInterval(progressUpdater);
    if (percent < 100) {
      setPercent(percent / 2);
      setTimeout(() => {
        setPercent(0);
        setCompleted(false);
      }, 30);
    }
  };

  const longPress = () => {
    if (completed) {
      return;
    }

    setProgressUpdater(
      setInterval(() => {
        setPercent((percent) => {
          if (percent < 100) {
            return percent + 1;
          } else if (percent >= 100) {
            if (completed !== true) {
              oncomplete && oncomplete();
              setCompleted(true);
            }
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
      <Progress
      size={"small"}
        format={format}
        type="circle"
        percent={completed ? 100 : percent}
      />
    </Flex>
  );
}

export default LongPressButton;
