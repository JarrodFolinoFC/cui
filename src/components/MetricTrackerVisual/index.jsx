import React, { useState, useEffect } from "react";
import { Modal, InputNumber, Form, Flex, Button, DatePicker } from "antd";

import RunTable from "./table";
import Graph from "./graph";

function MetricTracker({ name, storageDriver = localStorage }) {
  const [graphDistance, setGraphDistance] = useState(2.2);

  const [runs, setRuns] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [graphModalOpen, setGraphModalOpen] = useState(false);

  useEffect(() => {
    const runs = storageDriver.getItem(name);
    if (runs) {
      setRuns(JSON.parse(runs));
    }
  }, []);

  return (
    <>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Show {name}
      </Button>
      <Button
        onClick={() => {
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
      >
        <Graph
          distance={graphDistance}
          data={runs.map((e) => {
            return {
              date: e.date,
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
