import "./App.css";
import { useState, type SubmitEventHandler } from "react";
import { type Task, type TaskFilter } from "./types/task";
import TaskFilters from "./components/TaskFilters";
import TaskItem from "./components/TaskItem";
import LoginForm from "./components/LoginForm";
import AddTaskForm from "./components/AddTaskForm";
import { getTasks } from "./api/get-tasks";
import { deleteTask } from "./api/delete-task";
import { addTask } from "./api/add-task";
import { patchTask } from "./api/patch-task";
import { getUser } from "./api/get-user";
import SearchForm from "./components/SearchForm";
import { getSearchTask } from "./api/get-search-task";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState<number | null>(null);

  const [filter, setFilter] = useState<TaskFilter>(undefined);

  const [search, setSearch] = useState<string>("");

  const handleLogout = () => {
    setUsername("");
    setTasks([]);
    setNewTask("");
    setError(null);
    setUserId(null);
    setSearch("");
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };
  const addNewTask = async () => {
    const newTitle = newTask.trim();
    if (!newTitle) return;
    const { id } = await getUser(username);

    const createdTask = await addTask(newTitle, id);
    setTasks((prev) => [...prev, createdTask]);
    setNewTask("");
  };
  const getMyTasks: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTasks([]);
    setError(null);
    try {
      const user = await getUser(username);
      setUserId(user.id);
      const data: Task[] = await getTasks(user.id, filter);
      setTasks(data);
    } catch (error) {
      setError("Failed to fetch tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };
  const onToggle = async (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) return;

    const updatedTask = await patchTask(id, !task.completed);

    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? updatedTask : task)),
    );
  };
  const handleChangeFilter = async (data: TaskFilter) => {
    setFilter(data);
    if (userId === null) return;

    setLoading(true);
    setError(null);
    try {
      const result = await getTasks(userId, data);
      setTasks(result);
    } catch {
      setError("Failed to filter tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTitle: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (userId === null) {
      setError("Log in to search tasks");
      return;
    }
    setLoading(true);
    setTasks([]);
    setError(null);
    try {
      const data: Task[] = await getSearchTask(userId, search);
      setTasks(data);
    } catch (error) {
      setError("Failed to fetch tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>TaskFlow</h1>

      <LoginForm
        username={username}
        onUsernameChange={setUsername}
        onSubmit={getMyTasks}
        onLogout={handleLogout}
        loading={loading}
      />
      <p>My tasks</p>

      <AddTaskForm
        newTask={newTask}
        onTaskChange={setNewTask}
        onAddTask={addNewTask}
      />
      <SearchForm
        title={search}
        onChangeTitle={setSearch}
        onSubmit={handleSearchTitle}
      />
      {loading && <p>Loading ...</p>}
      {error && <p>{error}</p>}

      {userId !== null && (
        <div>
          <TaskFilters
            filter={filter}
            onFilterChange={handleChangeFilter}
            onSubmit={getMyTasks}
          />
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
        </div>
      )}
    </main>
  );
}

export default App;
