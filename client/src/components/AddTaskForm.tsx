import { useState } from "react";

type AddTaskFormProps = {
  newTask: string;
  onTaskChange: (value: string) => void;
  onAddTask: () => Promise<void>;
};

const AddTaskForm = ({ newTask, onTaskChange, onAddTask }: AddTaskFormProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (submitting) return;

        if (newTask.trim().length < 3) {
          setError("Task title must contain at least 3 characters.");
          return;
        }

        setSubmitting(true);
        setError(null);
        try {
          await onAddTask();
        } catch {
          setError("Failed to add task. Please try again.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <input
        type="text"
        value={newTask}
        disabled={submitting}
        onChange={(e) => onTaskChange(e.target.value)}
      />
      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "AddNewTask"}
      </button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
};

export default AddTaskForm;
