import type { taskItemProps } from "../types/task";
import "../App.css";

const TaskItem = ({ task, onToggle, deleteTask }: taskItemProps) => {
  return (
    <li className="tasks_list">
      <p>{task.title}</p>
      <div>
        <input
          type="checkbox"
          onChange={() => onToggle(task.id)}
          checked={task.completed}
        />
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;
