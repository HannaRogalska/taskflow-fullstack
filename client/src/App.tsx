import "./App.css";
import { useState } from "react";
import { type Task } from "./types/task";
import TaskItem from "./components/TaskItem";

export const initialTasks: Task[] = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Connect with Neon", completed: false },
  { id: 3, title: "Create backend", completed: true },
];

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addNewTask = () => {
    const newTitle = newTask.trim();

    const createNewTask: Task = {
      id: Date.now(),
      title: newTitle,
      completed: false,
    };
    setTasks((prev) => [...prev, createNewTask]);
    setNewTask("");
  };
  const onToggle = (id: number) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };
  const deleteTask = (id: number) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  };
  return (
    <main>
      <h1>TaskFlow</h1>
      <p>My tasks</p>
      <form onSubmit={(e) => (e.preventDefault(), addNewTask())}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">AddNewTask</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </main>
  );
}

export default App;
