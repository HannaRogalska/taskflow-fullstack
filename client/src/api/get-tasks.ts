import type { Task } from "../types/task";
import { api } from "./axios/axios-instance";

export const getTasks = async (
  id: number,
  filter?: "true" | "false",
): Promise<Task[]> => {
  const url =
    filter === undefined
      ? `/api/users/${id}/tasks`
      : `/api/users/${id}/tasks?completed=${filter}`;

  const response = await api.get<Task[]>(url);
  return response.data;
};
