import React, { useState, useEffect } from "react";
import { Statistic, Space, Button, Spin } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import asyncLocalStorage from "../../utils/asyncLocalStorage";
import { Col, Row } from "antd";

function Counter({ names, storageDriver = asyncLocalStorage }) {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newCounts = {};
        for (const name of names) {
          const item = await storageDriver.getItem(name);
          if (item) {
            newCounts[name] = Number(JSON.parse(item).count);
          } else {
            await storageDriver.setItem(name, JSON.stringify({ count: 0 }));
            newCounts[name] = 0;
          }
        }
        setCounts(newCounts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [names]);

  function saveCount(name, value) {
    storageDriver.setItem(name, JSON.stringify({ count: value }));
    setCounts((prevCounts) => ({ ...prevCounts, [name]: value }));
  }

  function decrement(name) {
    if (counts[name] - 1 >= 0) {
      saveCount(name, counts[name] - 1);
    }
  }

  function increment(name) {
    saveCount(name, counts[name] + 1);
  }

  return names.map((name) => {
    return (
      <Row gutter={1} align="middle">
        <Col span={10}>{name}</Col>
        <Col span={4}>
          {counts[name] !== undefined ? (
            <Statistic value={counts[name]} precision={0} />
          ) : (
            <Spin />
          )}
        </Col>
        <Col span={4}>
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
