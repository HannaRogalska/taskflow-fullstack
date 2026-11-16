import type { ActiveUserStats } from "../types/task";
import { api } from "./axios/axios-instance";

const getStatistic = async (): Promise<ActiveUserStats[]> => {
  const response = await api.get("/api/tasks/stats/active-users");
  return response.data;
};

export default getStatistic;
