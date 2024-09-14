import { Card, Input, Select, Statistic } from "antd";
import React, { useState, useEffect } from "react";

const currencies = ["USD", "EUR", "GBP", "AUD"];

function CurrecyConvertor() {
  const [exchangeRateMapping, setExchangeRateMapping] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState("GBP");
  const [toCurrency, setToCurrency] = useState("AUD");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`https://open.er-api.com/v6/latest/${baseCurrency}`)
      .then((response) => response.json())
      .then((data) => {
        setExchangeRateMapping(data.rates);

        setResult(data.rates[toCurrency]);
      });
  }, []);

  return (
    <Card size="small" title="Cross Rates">
      <Statistic title="GBP" prefix={toCurrency} value={result} precision={2} />
    </Card>
  );
}

export default CurrecyConvertor;
