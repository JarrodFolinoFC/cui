import { Card, Input, Select, Statistic } from "antd";
import React, { useState, useEffect } from "react";

const currencies = ["USD", "EUR", "GBP", "AUD"];

function CurrecyConvertor({ baseCurrency }) {
  const [exchangeRateMapping, setExchangeRateMapping] = useState(null);

  useEffect(() => {
    fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        setExchangeRateMapping(data);
      });
  }, []);

  return (
    <>
      {currencies.map((currency) => {
        return (
          <Statistic
            size="small"
            key={currency}
            prefix={currency}
            value={exchangeRateMapping && exchangeRateMapping.rates[currency]}
            precision={2}
          />
        );
      })}
    </>
  );
}

export default CurrecyConvertor;
