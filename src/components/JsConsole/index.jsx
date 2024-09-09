import { Input, Card } from "antd";
import { useState } from "react";

function JsConsole() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");

  function runCode(e) {
    try {
      setCode(e.target.value);
      setResult(eval(e.target.value));
    } catch (error) {
      // do nothing
    }
  }

  return (
    <Card title="Js Calculator">
      <Input onChange={runCode} value={code}></Input>
      <span>{result}</span>
    </Card>
  );
}

export default JsConsole;
