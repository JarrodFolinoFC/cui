import { useState, useEffect } from "react";
import MyForm from "./MyForm";
import Todo from "./Todo";
import { List } from "antd-mobile";
import { v4 as uuidv4 } from "uuid";

import asyncLocalStorage from "../../utils/asyncLocalStorage";

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
        return { ...task, name: newName, editing: false };
      }
      return task;
    });
    setTasks(editedTaskList);
    storageDriver.setItem(name, JSON.stringify(editedTaskList));
  }

  function markAsWip(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, wip: !task.wip };
      }
      return task;
    });
    setTasks(updatedTasks);
    storageDriver.setItem(name, JSON.stringify(updatedTasks));
  }

  function addTask(taskName) {
    const newTask = {
      id: uuidv4(),
      name: taskName,
      completed: false,
      wip: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    storageDriver.setItem(name, JSON.stringify(newTasks));
  }

  return (
    <>
      <h3>{name}</h3>
      <MyForm addTask={addTask} />

      <List size="small">
        {tasks.map((task) => {
          return (
            <Todo
              id={task.id}
              name={task.name}
              completed={task.completed}
              key={task.id}
              toggleTaskCompleted={toggleTaskCompleted}
              isEditing={task.editing}
              editTask={editTask}
              markAsWip={markAsWip}
              wip={task.wip}
              deleteTask={deleteTask}
            />
          );
        })}
      </List>
    </>
  );
}

export default App;
