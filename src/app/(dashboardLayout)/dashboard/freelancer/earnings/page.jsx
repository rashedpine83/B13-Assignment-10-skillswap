import { DollarSign, TrendingUp } from "lucide-react";
import { getPaymentsByEmail } from "@/lib/api/payment";
import { getUserSession } from "@/lib/core/session";
import FreelancerEarningChart from "./FreelancerEarningChart";

const FreelancerEarningPage = async () => {
  const user = await getUserSession();

  const emailId = user?.email;

  const paymentData = await getPaymentsByEmail(emailId);

  const freelancerPayments =
    paymentData?.filter((payment) => payment.freelancerEmailId === emailId) ||
    [];

  const totalEarned = freelancerPayments.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0,
  );

  const averagePerTask =
    freelancerPayments.length > 0
      ? (totalEarned / freelancerPayments.length).toFixed(2)
      : 0;

  const chartData = [
    {
      month: "Jan",
      earning: 0,
    },
    {
      month: "Feb",
      earning: 0,
    },
    {
      month: "Mar",
      earning: 0,
    },
    {
      month: "Apr",
      earning: 0,
    },
    {
      month: "May",
      earning: 0,
    },
    {
      month: "Jun",
      earning: totalEarned,
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}

      <div className="mb-8">
        <h1
          className="
          pb-3
          text-4xl
          font-bold
          bg-gradient-to-r
          from-purple-600
          via-cyan-500
          to-orange-500
          bg-clip-text
          text-transparent"
        >
          Earnings
        </h1>

        <p className="text-gray-500 mt-2">
          Track your income from completed tasks
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="
          bg-white
          rounded-3xl
          p-6
          border
          border-purple-200
          shadow-md"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Total Earned</p>

              <h2 className="text-4xl font-bold mt-2">${totalEarned}</h2>

              <p className="text-sm text-gray-400 mt-2">
                From {freelancerPayments.length} payments
              </p>
            </div>

            <div
              className="
              h-14 w-14
              rounded-2xl
              bg-purple-100
              flex
              items-center
              justify-center"
            >
              <DollarSign className="text-purple-600" />
            </div>
          </div>
        </div>

        <div
          className="
          bg-white
          rounded-3xl
          p-6
          border
          border-cyan-200
          shadow-md"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Average Per Task</p>

              <h2 className="text-4xl font-bold mt-2 text-cyan-600">
                ${averagePerTask}
              </h2>

              <p className="text-sm text-gray-400 mt-2">
                Average earning per completed task
              </p>
            </div>

            <div
              className="
              h-14 w-14
              rounded-2xl
              bg-cyan-100
              flex
              items-center
              justify-center"
            >
              <TrendingUp className="text-cyan-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}

      <div
        className="
        bg-white
        rounded-3xl
        p-6
        mt-8
        shadow-md"
      >
        <h2 className="font-bold text-xl mb-6">Monthly Earnings</h2>

        <FreelancerEarningChart chartData={chartData} />
      </div>

      {/* Table */}

      <div
        className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-md
        mt-8"
      >
        <table className="w-full">
          <thead
            className="
            bg-gradient-to-r
            from-purple-50
            to-cyan-50"
          >
            <tr>
              <th className="p-4 text-left">Task</th>

              <th className="p-4 text-left">Client</th>

              <th className="p-4 text-left">Amount</th>

              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {freelancerPayments.map((payment) => (
              <tr key={payment._id} className="border-t">
                <td className="p-4">{payment.taskTitle}</td>

                <td className="p-4 text-gray-500">{payment.clientEmailId}</td>

                <td className="p-4 font-bold text-green-600">
                  +$
                  {payment.price}
                </td>

                <td className="p-4 text-gray-500">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FreelancerEarningPage;
