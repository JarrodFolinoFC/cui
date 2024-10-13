import React, { useState } from "react";
import { Progress, Flex, Button } from "antd";

const PomodoroTimer = ({ duration = 25 }) => {
  const [progressUpdater, setProgressUpdater] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const totalSeconds = duration * 60;

  const clearTimer = () => {
    clearInterval(progressUpdater);
    setElapsedSeconds(0);
  };

  const pauseTimer = () => {
    setState("paused");
    clearInterval(progressUpdater);
  };

  const startTimer = () => {
    setState("running");
    setProgressUpdater(
      setInterval(() => {
        setElapsedSeconds((elapsedSeconds) => {
          if (elapsedSeconds < 100) {
            return elapsedSeconds + 1;
          } else if (elapsedSeconds >= 100) {
            clearInterval(progressUpdater);
            return 100;
          }
        });
      }, 1000)
    );
  };

  return (
    <Flex justify="center" align="centre">
      <Progress
        percent={(elapsedSeconds / totalSeconds) * 100}
        format={() => {
          const minutes = Math.floor(elapsedSeconds / 60);
          const seconds = elapsedSeconds % 60;
          return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
        }}
        type="circle"
        onClick={startTimer}
      />
      <Button onClick={clearTimer}>Cancel</Button>
    </Flex>
  );
};

export default PomodoroTimer;
