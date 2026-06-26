import { serverFetch } from "../core/server";

// export const getProposals = async () => {
//   //used limit
//   return serverFetch("/api/proposals");
// };

// export const getAllMyProposals = async () => {
//   return serverFetch("/api/proposals/my-proposals");
// };

export const getProposalsByEmail = async (email) => {
  return serverFetch(`/api/proposals/email?email=${encodeURIComponent(email)}`);
};

export const getProposalsByTaskId = async (taskId) => {
  return serverFetch(`/api/proposals/${encodeURIComponent(taskId)}`);
};

export const getProposalsById = async (id) => {
  return serverFetch(`/api/proposal/${id}`);
};
