import React, { useState, useEffect } from "react";
import {
  Modal,
  InputNumber,
  Form,
  Flex,
  Button,
  DatePicker,
  Statistic,
} from "antd";

import dayjs from "dayjs";
import RunTable from "./table";
import Graph from "./graph";

function MetricTracker({ name, storageDriver = localStorage }) {
  const [date, setDate] = useState(dayjs());
  const [distance, setDistance] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  const [runs, setRuns] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [graphModalOpen, setGraphModalOpen] = useState(false);

  useEffect(() => {
    const runs = storageDriver.getItem(name);
    if (runs) {
      setRuns(JSON.parse(runs));
    }
  }, []);

  const handleDateChange = (date) => {
    setDate(date.toLocaleString("en-GB", { timeZone: "Europe/London" }));
  };

  function save() {
    const newRuns = [...runs, { date: date, distance, minutes, seconds }];
    localStorage.setItem(name, JSON.stringify(newRuns));
    setRuns(newRuns);
    setSeconds(0);
    setMinutes(0);
    setDate("");
  }

  return (
    <Form size="small" name={name}>
      <Flex vertical>
        <Flex gap={4} justify="space-between">
          <Form.Item name={["user"]}>
            <DatePicker defaultValue={dayjs()} onChange={handleDateChange} />
          </Form.Item>
          <Form.Item>
            <InputNumber
              style={{
                width: "8em",
              }}
              addonBefore="km"
              value={distance}
              onChange={(value) => {
                setDistance(value);
              }}
              size="small"
            />
          </Form.Item>
          <Form.Item>
            <InputNumber
              style={{
                width: "8em",
              }}
              onChange={(value) => setMinutes(value)}
              value={minutes}
              addonBefore="m"
              size="small"
            />
            <InputNumber
              style={{
                width: "8em",
              }}
              onChange={(value) => setSeconds(value)}
              value={seconds}
              addonBefore="s"
              size="small"
            />
          </Form.Item>
        </Flex>
        <Flex gap={5} justify="space-between">
          <Form.Item>
            <Button
              disabled={!(distance && minutes && seconds)}
              onClick={save}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
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
              Graph {name}
            </Button>
          </Form.Item>
          <Form.Item>
            <Statistic
              title="Total Distance"
              value={`${runs.reduce((acc, run) => acc + run.distance, 0)}km`}
            />
          </Form.Item>
        </Flex>

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
          title="Runs"
          open={graphModalOpen}
          onOk={() => {
            setGraphModalOpen(false);
          }}
          onCancel={() => {
            setGraphModalOpen(false);
          }}
        >
          <Graph
            data={runs.map((e) => {
              return {
                date: e.date,
                minutes: e.minutes + e.seconds / 60,
              };
            })}
          />
        </Modal>
      </Flex>
    </Form>
  );
}

export default MetricTracker;
