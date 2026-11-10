import type { SubmitEventHandler } from "react";
import type { TaskFilter } from "../types/task";

type TaskFiltersProps = {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
};

const TaskFilters = ({ filter, onFilterChange, onSubmit }: TaskFiltersProps) => {
  return (
    <form className="content" onSubmit={onSubmit}>
      <div>
        <label>
          All tasks
          <input
            type="radio"
            name="status"
            checked={filter === undefined}
            onChange={() => onFilterChange(undefined)}
          />
        </label>
      </div>
      <div>
        <label>
          Active
          <input
            type="radio"
            name="status"
            checked={filter === "false"}
            onChange={() => onFilterChange("false")}
          />
        </label>
      </div>
      <div>
        <label>
          Completed
          <input
            type="radio"
            name="status"
            checked={filter === "true"}
            onChange={() => onFilterChange("true")}
          />
        </label>
      </div>
    </form>
  );
};

export default TaskFilters;
