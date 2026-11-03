import type { User } from "../types/user";
import { api } from "./axios/axios-instance";

export const getUser = async (name: string) => {
  const userName = name.trim();
  const response = await api.post<User>(`/api/users/login`, { userName });
  return response.data;
};
