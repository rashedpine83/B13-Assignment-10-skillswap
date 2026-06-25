import { serverMutation } from "../core/server";

export const createPayment = async (paymentInfo) => {
  return serverMutation("/api/payments", paymentInfo);
};
