import React, { useState, useEffect } from "react";
import { Modal, InputNumber, Form, Flex, Button, DatePicker } from "antd";

import RunTable from "./table";
import Graph from "./graph";

function MetricTracker({ name, storageDriver = localStorage }) {
  const [graphDistance, setGraphDistance] = useState(null);

  const [runs, setRuns] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [graphModalOpen, setGraphModalOpen] = useState(false);

  function loadRuns() {
    const runs = storageDriver.getItem(name);
    if (runs) {
      const parsedRuns = JSON.parse(runs);
      setRuns(parsedRuns);
      setGraphDistance(parsedRuns[parsedRuns.length - 1].distance);
    }
  }

  useEffect(() => {
    loadRuns()
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          loadRuns()
          setModalOpen(true);
        }}
      >
        Show {name}
      </Button>
      <Button
        onClick={() => {
          loadRuns()
          setGraphModalOpen(true);
        }}
      >
        Graph {name} ({graphDistance}km)
      </Button>

      <Modal
        title="Runs"
        open={modalOpen}
        onOk={() => {
          setModalOpen(false);
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
        footer={null}
      >
        <RunTable runs={runs} />
      </Modal>
      <Modal
        title={`Runs ${graphDistance}km`}
        open={graphModalOpen}
        onOk={() => {
          setGraphModalOpen(false);
        }}
        onCancel={() => {
          setGraphModalOpen(false);
        }}
        footer={null}
      >
        <Graph
          distance={graphDistance}
          data={runs.map((e) => {
            const date = new Date(e.date);
            const formattedDate = date.toISOString().split("T")[0];
            return {
              date: formattedDate,
              minutes: e.minutes + e.seconds / 60,
              distance: e.distance,
            };
          })}
        />
      </Modal>
    </>
  );
}

export default MetricTracker;
