import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getClientTasks = async (emailId, status = "open") => {
  const res = await fetch(
    `${baseUrl}/api/tasks?emailId=${emailId}&status=${status}`,
  );

  return res.json();
};

export const getTaskById = async (taskId) => {
  return serverFetch(`/api/tasks/${taskId}`, {});
};

export const getTask = async (query = "") => {
  return serverFetch(`/api/tasks${query ? `?${query}` : ""}`);
};

export const getSingleTask = async (id) => {
  return serverFetch(`/api/tasks/${id}`);
};

export const getTaskByClientEmail = async (email) => {
  return serverFetch(`/api/tasks/email?email=${encodeURIComponent(email)}`);
};
