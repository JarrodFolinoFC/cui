import React, { useState } from "react";

import { Avatar } from "antd";

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
    <div className={`coin ${result}`} key={+new Date()}>
      <div className="side-a" onClick={coinToss}>
        <Avatar onClick={coinToss} size={96}>
          TAILS
        </Avatar>
      </div>

      <div className="side-b" onClick={coinToss}>
        <Avatar size={96}>HEADS</Avatar>
      </div>
    </div>
  );
};

export default App;
