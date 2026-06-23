import { serverFetch, serverMutation } from "../core/server";

export const createUser = async (newUser) => {
  return serverMutation("/api/users", newUser);
};

export const getUserByEmail = async (email) => {
  return await serverFetch(`/api/users/${email}`);
};

export const updateUser = async (email, data) => {
  const result = serverMutation(`/api/users/${email}`, data, "PATCH");

  return result;
};
