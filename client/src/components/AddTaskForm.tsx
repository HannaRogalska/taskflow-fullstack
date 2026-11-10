type AddTaskFormProps = {
  newTask: string;
  onTaskChange: (value: string) => void;
  onAddTask: () => Promise<void>;
};

const AddTaskForm = ({ newTask, onTaskChange, onAddTask }: AddTaskFormProps) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        return onAddTask();
      }}
    >
      <input
        type="text"
        value={newTask}
        onChange={(e) => onTaskChange(e.target.value)}
      />
      <button type="submit">AddNewTask</button>
    </form>
  );
};

export default AddTaskForm;
