import { api } from "./axios/axios-instance";
type DeleteTaskResponse = {
  message: string;
};

export const deleteTask = async (id: number): Promise<DeleteTaskResponse> => {
  const response = await api.delete<DeleteTaskResponse>(`/api/tasks/${id}`);
  return response.data;
};
