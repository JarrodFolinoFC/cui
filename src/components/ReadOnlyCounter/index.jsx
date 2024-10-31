import React, { useState, useEffect } from "react";
import { Row, Col, Statistic, Spin, Space, Button } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

function ReadOnlyCounter({ config }) {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newCounts = {};
        for (const c of config) {
          newCounts[c.name] = c.load();
        }
        setCounts(newCounts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

    fetchData();
  }, []);

  return Object.keys(counts).map((name) => {
    return (
      <Row gutter={1} align="middle" key={name}>
        <Col key={`${name}_name`} span={10}>
          {name}
        </Col>
        <Col key={`${name}_count`} span={4}>
          {counts[name] !== undefined ? (
            <Statistic value={counts[name]} precision={0} />
          ) : (
            <Spin />
          )}
        </Col>
        <Col key={`${name}_btn`} span={4}>
          <Space>
            <Button disabled={true} icon={<UpOutlined />} />
            <Button disabled={true} icon={<DownOutlined />} />
          </Space>
        </Col>
      </Row>
    );
  });
}

export default ReadOnlyCounter;
