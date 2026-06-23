import { serverMutation } from "../core/server";

export const createProposal = async (newProposal) => {
  return serverMutation("/api/proposals", newProposal);
};

export const updateProposalStatus = async (id, status) => {
  return serverMutation(`/api/proposals/${id}`, { status }, "PATCH");
};
