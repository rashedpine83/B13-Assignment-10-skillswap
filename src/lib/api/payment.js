import { serverFetch } from "@/lib/core/server";

export const getPaymentsByEmail = async (email) => {
  const data = await serverFetch(
    `/api/payments/email?email=${encodeURIComponent(email)}`,
  );

  console.log("Payment API Response:", data);

  return data;
};
