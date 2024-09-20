import { useEffect, useRef, useState } from "react";
import { List, Input, Space, Form, Flex, Checkbox } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  UndoOutlined,
} from "@ant-design/icons";

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
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.name);

  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);

  const wasEditing = usePrevious(isEditing);

  function handleChange(event) {
    setNewName(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      props.editTask(props.id, newName);
      setEditing(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }

  const editingTemplate = (
    <List.Item key={props.name} style={{ minWidth: "380px" }}>
      <Form className="stack-small" onSubmit={handleSubmit}>
        <Space>
          <Input
            id={props.id}
            value={newName}
            onChange={handleChange}
            ref={editFieldRef}
            onKeyDown={handleKeyPressSave}
          />
          <SaveOutlined
            onClick={() => {
              props.editTask(props.id, newName);
              setEditing(false);
            }}
          />
          <UndoOutlined onClick={() => setEditing(false)} />
        </Space>
      </Form>
    </List.Item>
  );

  const viewTemplate = (
    <List.Item key={props.name} style={{ minWidth: "380px" }}>
      <Flex>
        <Checkbox
          checked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        >
          {props.completed ? <strike>{newName}</strike> : newName}
        </Checkbox>

        <Space>
          <EditOutlined
            ref={editButtonRef}
            onClick={() => {
              setEditing(true);
            }}
          />
          <DeleteOutlined onClick={() => props.deleteTask(props.id)} />
        </Space>
      </Flex>
    </List.Item>
  );

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    } else if (wasEditing && !isEditing) {
      editButtonRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return isEditing ? editingTemplate : viewTemplate;
}

export default Todo;
