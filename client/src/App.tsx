import "./App.css";
import { useEffect, useState } from "react";
import { type Task } from "./types/task";
import TaskItem from "./components/TaskItem";
import { getTasks } from "./api/get-tasks";
import { deleteTask } from "./api/delete-task";
import { addTask } from "./api/add-task";
import { patchTask } from "./api/patch-task";

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
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  const addNewTask = async () => {
    const newTitle = newTask.trim();
    if (!newTitle) return;

    const createdTask = await addTask(newTitle);
    setTasks((prev) => [...prev, createdTask]);
    setNewTask("");
  };
  const onToggle = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    const updatedTask = await patchTask(id, !task.completed);

    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? updatedTask : task)),
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
            onToggle={() => {
              onToggle(task.id);
            }}
            deleteTask={handleDeleteTask}
          />
        ))}
      </ul>
    </main>
  );
}

export default App;
