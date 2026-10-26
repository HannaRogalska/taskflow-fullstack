import "./App.css";
import { useEffect, useState } from "react";
import { type Task } from "./types/task";
import TaskItem from "./components/TaskItem";
import { getTasks } from "./api/get-tasks";
import { deleteTask } from "./api/delete-task";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data: Task[] = await getTasks();

        setTasks(data);
      } catch (error) {
        setError("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);
  const handleDeleteTask = async (id: number) => {
    const updatedTasks = await deleteTask(id);
    setTasks(updatedTasks);
  };
  const addNewTask = () => {
    const newTitle = newTask.trim();
    if (!newTitle) return;

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
      {loading && <p>Loading ...</p>}
      {error && <p>{error}</p>}
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            deleteTask={handleDeleteTask}
          />
        ))}
      </ul>
    </main>
  );
}

export default App;
