import { Timeline } from "antd";
import React, { useState, useEffect } from "react";

import PreviewCard from "../PreviewCard";

function CountriesVisited({ previewCount = 4 }) {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5173/visits.json")
      .then((response) => response.json())
      .then((data) => {
        setVisits(data.reverse());
      });
  }, []);

  const uniqueCountries = (visits) => {
    return visits
      .map((visit) => visit.country)
      .filter((country, index, self) => self.indexOf(country) === index);
  };

  const getTimeline = (visits) => {
    return (
      <Timeline
        mode="right"
        items={visits.map((item) => {
          return {
            date: item.date,
            children: `${item.country} (${item.city || item.place})`,
          };
        })}
      />
    );
  };

  return (
    <PreviewCard
      title={`Countries (${uniqueCountries(visits).length}) `}
      content={getTimeline(visits)}
      preview={getTimeline(visits.slice(0, previewCount))}
    />
  );
}

export default CountriesVisited;
