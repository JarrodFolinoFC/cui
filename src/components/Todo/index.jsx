import { useState, useEffect } from "react";
import MyForm from "./MyForm";
import Todo from "./Todo";
import { Card, List } from "antd";
import { v4 as uuidv4 } from "uuid";

import MirrorStorage from "../../utils/mirrorStorage";
import asyncLocalStorage from "../../utils/asyncLocalStorage";

const URL = "https://wz17dd6el1.execute-api.eu-west-1.amazonaws.com/v1/storage";
const mirrorStorage = new MirrorStorage(URL, "aaaa");

function App({ name = "tasks", storageDriver = asyncLocalStorage }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await storageDriver.getItem(name);
        if (data) {
          setTasks(JSON.parse(data));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [storageDriver]);

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    storageDriver.setItem(name, JSON.stringify(updatedTasks));
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
    storageDriver.setItem(name, JSON.stringify(remainingTasks));
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });
    setTasks(editedTaskList);
    storageDriver.setItem(name, JSON.stringify(editedTaskList));
  }

  function addTask(taskName) {
    const newTask = {
      id: uuidv4(),
      name: taskName,
      completed: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    storageDriver.setItem(name, JSON.stringify(newTasks));
  }

  return (
    <Card title={`Todo (${name})`} size="small">
      <MyForm addTask={addTask} />
      <List size="small">
        {tasks.map((task) => (
          <Todo
            id={task.id}
            name={task.name}
            completed={task.completed}
            key={task.id}
            toggleTaskCompleted={toggleTaskCompleted}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </List>
    </Card>
  );
}

export default App;
