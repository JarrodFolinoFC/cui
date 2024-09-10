import React, { useState, useEffect } from "react";
import { Statistic } from "antd";

import PreviewCard from "../PreviewCard";

function Weather({ location, latitude = 52.52, longitude = 13.41 }) {
  const [temperature, setTemperature] = useState(null);

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;

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

  return (
    <PreviewCard
      title={location}
      content={<></>}
      preview={
        <Statistic
          title="Temperature"
          value={temperature}
          suffix="°C"
          precision={1}
        />
      }
    />
  );
}

export default Weather;
