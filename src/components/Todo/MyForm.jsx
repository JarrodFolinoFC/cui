import { useState } from "react";
import { Input, Button, Space, Form } from "antd";
import { SaveOutlined } from "@ant-design/icons";
function MyForm(props) {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (value === "") {
      return;
    }
    props.addTask(value);
    setValue("");
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      props.addTask(value);
      setValue("");
    }
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <Space.Compact style={{ width: "100%" }}>
        <Input
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <Button type="primary" onClick={handleSubmit}>
          <SaveOutlined />
        </Button>
      </Space.Compact>
    </Form>
  );
}

export default MyForm;
