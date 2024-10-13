import React, { useState, useEffect } from "react";
import { Statistic } from "antd";
import { Spin, Card, Flex, Row, Col } from "antd";

function Weather({ location, timeInfo, latitude = 52.52, longitude = 13.41 }) {
  const [temperature, setTemperature] = useState(null);
  const [times, setTimes] = useState(getFormattedTime(timeInfo));

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

  function getFormattedTime(format) {
    const currentTime = new Intl.DateTimeFormat("en-AU", {
      timeZone: format,
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
    return currentTime;
  }

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTemperature(data.current.temperature_2m);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  useEffect(() => {
    setInterval(() => {
      setTimes(getFormattedTime(timeInfo));
    }, 60 * 1000);
  }, []);

  return (
    <Row align={"middle"} gutter={4}>
      <Col span={8}>
        {temperature ? (
          <Statistic value={temperature} suffix="°C" precision={1} />
        ) : (
          <Spin />
        )}
      </Col>
      <Col>
        {timeInfo.split("/")[1]} {times}
      </Col>
    </Row>
  );
}

export default Weather;
