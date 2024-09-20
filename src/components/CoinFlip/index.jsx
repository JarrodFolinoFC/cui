import React, { useState } from "react";

import { Card, Avatar } from "antd";

import "./style.css";

const App = () => {
  const [result, setResult] = useState("");

  function coinToss() {
    if (Math.random() < 0.5) {
      setResult("heads");
    } else {
      setResult("tails");
    }
  }

  return (
    <Card title="Coin Flip" size="small">
      <div id="coin" className={result} key={+new Date()} onClick={coinToss}>
        <div class="side-a">
          <Avatar size={96}>TAILS</Avatar>
        </div>

        <div className="side-b">
          <Avatar size={96}>HEADS</Avatar>
        </div>
      </div>
    </Card>
  );
};

export default App;
