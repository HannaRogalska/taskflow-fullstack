import type { taskItemProps } from "../types/task";

const TaskItem = ({ task, onToggle, deleteTask }: taskItemProps) => {
  return (
    <li>
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
