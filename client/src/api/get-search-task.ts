import { api } from "./axios/axios-instance";
import type { Task } from "../types/task";

export const getSearchTask = async (
  id: number,
  searchTitle: string,
): Promise<Task[]> => {
  const response = await api.get<Task[]>(`/api/users/${id}/tasks/search`, {
    params: { search: searchTitle },
  });
  return response.data;
};
