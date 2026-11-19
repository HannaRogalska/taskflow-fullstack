import { useState } from "react";

type AddTaskFormProps = {
  newTask: string;
  onTaskChange: (value: string) => void;
  onAddTask: () => Promise<void>;
};

const AddTaskForm = ({ newTask, onTaskChange, onAddTask }: AddTaskFormProps) => {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (submitting) return;

        setSubmitting(true);
        try {
          await onAddTask();
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
    </form>
  );
};

export default AddTaskForm;
