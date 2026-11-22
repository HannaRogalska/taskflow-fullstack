import type { Task } from "../types/task";
import { api } from "./axios/axios-instance";
const getTasksOfUsersWithPendingTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks/from-active-users");
  return response.data;
};

export default getTasksOfUsersWithPendingTasks;
