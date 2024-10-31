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
      const parsedRuns = JSON.parse(runs);
      setRuns(parsedRuns);
      setDistance(parsedRuns[parsedRuns.length - 1].distance);
      setMinutes(parsedRuns[parsedRuns.length - 1].minutes);
      setSeconds(parsedRuns[parsedRuns.length - 1].seconds);
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
      <Flex vertical gap={0} justify="space-between">
        <Form.Item name={["user"]}>
          <DatePicker
            style={{ width: "90%" }}
            defaultValue={dayjs()}
            onChange={handleDateChange}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <InputNumber
            style={{
              width: "90%",
            }}
            addonBefore="km"
            value={distance}
            min={0}
            max={10}
            onChange={(value) => {
              setDistance(value);
            }}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <InputNumber
            style={{
              width: "45%",
            }}
            min={0}
            max={59}
            onChange={(value) => setMinutes(value)}
            value={minutes}
            addonBefore="m"
            size="large"
          />
          <InputNumber
            style={{
              width: "45%",
            }}
            min={0}
            max={59}
            onChange={(value) => setSeconds(value)}
            value={seconds}
            addonBefore="s"
            size="large"
          />
        </Form.Item>
      </Flex>
      <Flex gap={5} justify="space-between">
        <Form.Item>
          <Button
            size="large"
            disabled={!(distance && minutes && seconds)}
            onClick={save}
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
}

export default MetricTracker;
