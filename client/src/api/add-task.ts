import { api } from "./axios/axios-instance";
import type { Task } from "../types/task";
export const addTask = async (title: string) => {
  const response = await api.post<Task>("/api/tasks", { title });
  return response.data;
};
