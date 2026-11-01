import type { Task } from "../types/task";
import { api } from "./axios/axios-instance";

export const getTasks = async (id: number): Promise<Task[]> => {
  const response = await api.get<Task[]>(`/api/users/${id}/tasks`);
  return response.data;
};
