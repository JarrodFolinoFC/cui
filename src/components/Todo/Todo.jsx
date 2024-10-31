import { useRef, useState } from "react";
import { Input, Space, Form, Flex, Tag, Button } from "antd";
import { List } from "antd-mobile";
import { EditOutlined, SaveOutlined, DeleteOutlined } from "@ant-design/icons";
import { SwipeAction } from "antd-mobile";

function handleKeyPressSave(event) {
  if (event.key === "Enter") {
    props.addTask(value);
    setValue("");
  }
}

function Todo(props) {
  const [isEditing, setEditing] = useState(props.isEditing);
  const [newName, setNewName] = useState(props.name);
  const [wip, setWip] = useState(props.wip);

  const editFieldRef = useRef(null);

  function handleChange(event) {
    setNewName(event.target.value);
  }

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
      leftActions={[
        {
          key: "delete",
          text: <DeleteOutlined />,
          onClick: () => props.deleteTask(props.id),
          color: "danger",
        },
        {
          key: "edit",
          text: <EditOutlined />,
          onClick: () => {
            setEditing(true);
          },
          color: "primary",
        },
      ]}
      rightActions={[
        {
          key: "wip",
          text: "WIP",
          onClick: () => {
            props.markAsWip(props.id);
            setWip(!wip);
          },
          color: "primary",
        },
      ]}
    >
      <List.Item key={props.name} style={{ maxWidth: "80%" }}>
        <Flex gap={2} align="flex-start">
          {wip && <Tag style={{ verticalAlign: "middle" }}>WIP</Tag>}
          {newName}
        </Flex>
      </List.Item>
    </SwipeAction>
  );

  return isEditing ? editingTemplate : viewTemplate;
}

export default Todo;
