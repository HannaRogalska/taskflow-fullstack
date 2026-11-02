import { api } from "./axios/axios-instance";
import type { Task } from "../types/task";
export const addTask = async (title: string, userId: number): Promise<Task> => {
  const response = await api.post<Task>(`/api/users/${userId}/tasks`, {
    title,
  });
  return response.data;
};
