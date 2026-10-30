import { api } from "./axios/axios-instance";
import type { Task } from "../types/task";

export const patchTask = async (
  id: number,
  completed: boolean,
): Promise<Task> => {
  const chengeComplete = await api.patch<Task>(`/api/tasks/${id}`, {
    completed,
  });
  return chengeComplete.data;
};
