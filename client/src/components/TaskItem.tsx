import type { taskItemProps } from "../types/task";
import "../App.css";

const TaskItem = ({ task, onToggle, deleteTask }: taskItemProps) => {
  return (
    <li className="tasks_list">
      <p>{task.title}</p>
      <div>
        <input
          type="checkbox"
          aria-label={`Mark ${task.title} as ${task.completed ? "active" : "completed"}`}
          onChange={() => onToggle(task.id)}
          checked={task.completed}
        />
        <button
          aria-label={`Delete task: ${task.title}`}
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
