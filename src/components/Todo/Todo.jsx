import { useEffect, useRef, useState } from "react";
import { Input, Space, Form, Flex, Checkbox, Button } from "antd";
import { List } from "antd-mobile";
import {
  EditOutlined,
  SaveOutlined,
  UndoOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { SwipeAction } from "antd-mobile";

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function handleKeyPressSave(event) {
  if (event.key === "Enter") {
    props.addTask(value);
    setValue("");
  }
}

function Todo(props) {
  const [isEditing, setEditing] = useState(props.isEditing);
  const [newName, setNewName] = useState(props.name);

  const editFieldRef = useRef(null);

  function handleChange(event) {
    setNewName(event.target.value);
  }

  // function handleKeyPress(event) {
  //   if (event.key === "Enter") {
  //     props.editTask(props.id, newName);
  //     setEditing(false);
  //   }
  // }

  function handleSubmit(event) {
    event.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <List.Item key={props.name}>
      <Form className="stack-small" onSubmit={handleSubmit}>
        <Space.Compact style={{ width: "80%" }}>
          <Input
            id={props.id}
            value={newName}
            onChange={handleChange}
            ref={editFieldRef}
            onKeyDown={handleKeyPressSave}
          />
          <Button
            type="primary"
            onClick={() => {
              props.editTask(props.id, newName);
              setEditing(false);
            }}
          >
            <SaveOutlined />
          </Button>
        </Space.Compact>
      </Form>
    </List.Item>
  );

  const viewTemplate = (
    <SwipeAction
      rightActions={[
        {
          key: "edit",
          text: <EditOutlined />,
          onClick: () => {
            setEditing(true);
          },
          color: "primary",
        },
        {
          key: "delete",
          text: <DeleteOutlined />,
          onClick: () => deleteTask(task.id),
          color: "danger",
        },
      ]}
    >
      <List.Item key={props.name} style={{ maxWidth: "80%" }}>
        <Flex>
          <Checkbox
            checked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          >
            {props.completed ? <strike>{newName}</strike> : newName}
          </Checkbox>
        </Flex>
      </List.Item>
    </SwipeAction>
  );

  return isEditing ? editingTemplate : viewTemplate;
}

export default Todo;
