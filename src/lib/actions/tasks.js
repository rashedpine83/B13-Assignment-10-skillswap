import { serverMutation } from "../core/server";

export const createTask = async (newTask) => {
  return serverMutation("/api/tasks", newTask);
};

export const updateTask = async (id, data) => {
  const result = serverMutation(`/api/tasks/${id}`, data, "PATCH");

  return result;
};

export const deleteTask = async (id) => {
  return serverMutation(`/api/tasks/${id}`, null, "DELETE");
};
