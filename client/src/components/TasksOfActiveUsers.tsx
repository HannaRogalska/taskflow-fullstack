import "../index.css";
import type { Task } from "../types/task";

type Props = {
  tasks: Task[];
};

export default function TasksOfActiveUsers({ tasks }: Props) {
  return (
    <section className="tasks-of-active-users">
      <h2 className="tasks-of-active-users__title">
        Tasks of users with pending tasks
      </h2>

      <ul className="tasks-of-active-users__list">
        {tasks.map((task) => (
          <li className="tasks-of-active-users__item" key={task.id}>
            <span className="tasks-of-active-users__task-title">
              {task.title}
            </span>
            <span
              className={`tasks-of-active-users__status tasks-of-active-users__status--${task.completed ? "completed" : "pending"}`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && (
        <p className="tasks-of-active-users__empty">No tasks available</p>
      )}
    </section>
  );
}
