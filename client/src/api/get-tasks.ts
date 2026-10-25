import type { Task } from "../types/task";
import { api } from "./axios/axios-instance";

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get<Task[]>("/api/tasks");
  return response.data;
};
