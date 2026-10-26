import type { Task } from "../types/task";
import { api } from "./axios/axios-instance";

export const deleteTask = async (id: number): Promise<Task[]> => {
  const response = await api.delete<Task[]>(`/api/tasks/${id}`);
  return response.data;
};
