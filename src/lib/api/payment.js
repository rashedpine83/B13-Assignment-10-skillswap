import { serverFetch } from "@/lib/core/server";

export const getClientPayment = async () => {
  try {
    return await serverFetch("/api/payments");
  } catch (error) {
    console.log("Payment API Error:", error);

    return [];
  }
};
