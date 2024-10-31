import React, { useState, useEffect } from "react";
import { Row, Col, Statistic, Spin, Space, Button } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

function Counter({ names, storageDriver = localStorage }) {
  const [counts, setCounts] = useState({});
  const [eventLogs, setEventLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newCounts = {};
        const newEventLogs = [];
        for (const name of names) {
          const item = await storageDriver.getItem(name);
          if (item) {
            const parsedItem = JSON.parse(item);
            newCounts[name] = parsedItem.count;
            newEventLogs.push(...parsedItem.logs);
          }
          else {
            newCounts[name] = 0
          }
        }
        setCounts(newCounts);
        setEventLogs(newEventLogs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [names, storageDriver]);

  function saveCount(name, value, logs) {
    storageDriver.setItem(name, JSON.stringify({ count: value, logs }));
    setCounts((prevCounts) => ({ ...prevCounts, [name]: value }));
    setEventLogs(logs);
  }

  function decrement(name) {
    if (counts[name] - 1 >= 0) {
      const newLogs = [...eventLogs];
      newLogs.pop();
      saveCount(name, counts[name] - 1, newLogs);
    }
  }

  function increment(name) {
    const newLogs = [...eventLogs];
    newLogs.push(new Date().toISOString());
    saveCount(name, counts[name] + 1, newLogs);
  }

  return names.map((name) => {
    return (
      <Row gutter={1} align="middle" key={name}>
        <Col key={`${name}_name`} span={10}>
          {name}
        </Col>
        <Col span={4} key={`${name}_stat`}>
          {counts[name] !== undefined ? (
            <Statistic value={counts[name]} precision={0} />
          ) : (
            <Spin />
          )}
        </Col>
        <Col span={4} key={`${name}_button`}>
          <Space>
            <Button onClick={() => increment(name)} icon={<UpOutlined />} />
            <Button onClick={() => decrement(name)} icon={<DownOutlined />} />
          </Space>
        </Col>
      </Row>
    );
  });
}

export default Counter;
