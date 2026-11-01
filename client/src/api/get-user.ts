import type { User } from "../types/user";
import { api } from "./axios/axios-instance";

export const getUser = async (name: string) => {
  const getName = name.trim();
  const response = await api.get<User>(`/api/users/login/${getName}`);
  return response.data;
};
