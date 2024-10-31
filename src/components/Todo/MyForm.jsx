import { useState } from "react";
import { Input, Button, Space, Form } from "antd";
import { CheckOutlined } from "@ant-design/icons";
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
      <Space.Compact style={{ width: "80%" }}>
        <Input
          value={value}
          size="large"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        <Button
          style={{ height: "auto" }}
          type="primary"
          onClick={handleSubmit}
          disabled={value === ""}
        >
          <CheckOutlined/>
        </Button>
      </Space.Compact>
    </Form>
  );
}

export default MyForm;
