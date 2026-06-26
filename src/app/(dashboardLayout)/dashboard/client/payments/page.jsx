// import { getClientPayment } from "@/lib/api/payment";
import { getPaymentsByEmail } from "@/lib/api/payment";
import { getUserSession } from "@/lib/core/session";
import { CreditCard } from "lucide-react";

const ClientPaymentHistory = async () => {
  const user = await getUserSession();
  const paymentData = await getPaymentsByEmail(user?.email);
  console.log("paymentData", paymentData);

  // Calculate total spent
  const totalSpent =
    paymentData?.reduce(
      (sum, payment) => sum + Number(payment.price || 0),
      0,
    ) || 0;

  return (
    <div className="p-6 md:p-8">
      <div className="overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-100 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
              <CreditCard size={30} className="text-emerald-600" />
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                Payment History
              </h1>

              <p className="mt-1 text-gray-500 text-lg">
                Total spent:{" "}
                <span className="font-semibold text-gray-900">
                  ${totalSpent}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Task
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Freelancer
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Amount
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {paymentData?.length > 0 ? (
                  paymentData.map((payment) => (
                    <tr
                      key={payment._id}
                      className="border-t border-gray-100 hover:bg-gray-100 transition-all"
                    >
                      {/* Task */}
                      <td className="px-6 py-5">
                        <div className="font-medium text-gray-900">
                          {payment.taskTitle}
                        </div>
                      </td>

                      {/* Freelancer */}
                      <td className="px-6 py-5 text-gray-600">
                        {payment.freelancerEmailId}
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-5 font-semibold text-gray-900">
                        ${payment.price}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-sm font-medium capitalize
                            
                          ${
                            payment.status === "paid"
                              ? "bg-green-100 text-green-700"
                              : payment.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }
                          
                          `}
                        >
                          {payment.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-gray-500">
                        {new Date(payment.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-16 text-center text-gray-500">
                      No payment history found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPaymentHistory;
