import type { Task } from "./task";

export type User = {
  id: number;
  name: string;
  tasks: Task;
};
