import React, { useState, useEffect } from "react";
import { Modal, InputNumber, Form, Flex, Button, DatePicker } from "antd";

import dayjs from "dayjs";

function MetricTracker({ name, storageDriver = localStorage }) {
  const [date, setDate] = useState(dayjs());
  const [distance, setDistance] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  const [runs, setRuns] = useState([]);

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
      <Flex vertical gap={4} justify="space-between">
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
        </Form.Item>
      </Flex>
    </Form>
  );
}

export default MetricTracker;
