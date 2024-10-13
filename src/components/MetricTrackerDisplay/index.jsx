import React, { useState, useEffect } from "react";
import { Statistic } from "antd";

function MetricTrackerVisual({ name, storageDriver = localStorage }) {
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    const runs = storageDriver.getItem(name);
    if (runs) {
      setRuns(JSON.parse(runs));
    }
  }, []);

  return (
    <Statistic
      title="Total Distance"
      value={`${runs.reduce((acc, run) => acc + run.distance, 0).toFixed(2)}km`}
    />
  );
}

export default MetricTrackerVisual;
