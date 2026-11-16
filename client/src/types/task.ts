export type TaskFilter = "true" | "false" | undefined;

export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export type taskItemProps = {
  task: Task;
  onToggle: (id: number) => void;
  deleteTask: (id: number) => void;
};

export type ActiveUserStats = {
  userId: number;
  total: number;
  name: string;
};
