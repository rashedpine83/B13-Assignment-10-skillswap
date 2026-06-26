import {
  ClipboardList,
  Clock3,
  CircleDollarSign,
  CheckCircle,
} from "lucide-react";

import { FiFileText, FiSearch } from "react-icons/fi";
import Link from "next/link";

import { getUserSession } from "@/lib/core/session";
import { getProposalsByEmail } from "@/lib/api/proposals";
import { getPaymentsByEmail } from "@/lib/api/payment";

export default async function FreelancerOverview() {
  const user = await getUserSession();

  const emailId = user?.email;

  const res = await getProposalsByEmail(user?.email);

  const paymentData = await getPaymentsByEmail(user?.email);

  console.log("paymentData:", paymentData);
  console.log("isArray:", Array.isArray(paymentData));

  const proposals = res || [];

  // ===== STATS =====

  const totalProposals = proposals.length;

  const pendingProposals = proposals.filter(
    (p) => p.status === "pending",
  ).length;

  const acceptedProposals = proposals.filter(
    (p) => p.status === "accepted" || p.status === "In Progress",
  ).length;

  // Current freelancer payments

  const freelancerPayments =
    paymentData?.filter((payment) => payment?.freelancerEmailId === emailId) ||
    [];

  // Total earned

  const totalEarned =
    freelancerPayments.reduce(
      (sum, payment) => sum + Number(payment?.price || 0),
      0,
    ) || 0;

  // Stats cards

  const stats = [
    {
      title: "Total Proposals",
      value: totalProposals,
      desc: "All proposals submitted",
      icon: ClipboardList,
    },
    {
      title: "Pending",
      value: pendingProposals,
      desc: "Waiting for response",
      icon: Clock3,
    },
    {
      title: "Accepted",
      value: acceptedProposals,
      desc: "Approved proposals",
      icon: CheckCircle,
    },
    {
      title: "Earned",
      value: `$${totalEarned}`,
      desc: "Total earnings received",
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="container p-10">
      {/* HEADER */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-700 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Freelancer Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Track your proposals and earnings
          </p>
        </div>

        <Link
          href="/browse-tasks"
          className="
          flex items-center gap-2 px-4 py-2 rounded-xl
          text-white text-sm font-medium
          bg-gradient-to-r from-cyan-500 to-purple-600
          hover:scale-105 transition"
        >
          <FiSearch />
          Browse Tasks
        </Link>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="
              bg-white
              rounded-3xl
              p-6
              border
              border-slate-100
              shadow-md
              hover:shadow-xl
              hover:-translate-y-2
              transition-all"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{item.title}</p>

                  <h2 className="text-4xl font-bold mt-2">{item.value}</h2>

                  <p className="text-gray-400 mt-2 text-sm">{item.desc}</p>
                </div>

                <div
                  className="
                  h-14
                  w-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-100
                  to-purple-100
                  flex
                  items-center
                  justify-center"
                >
                  <Icon size={24} className="text-purple-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* RECENT PROPOSALS */}

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Recent Proposals</h2>

        {proposals.length === 0 ? (
          <div className="bg-white border rounded-2xl p-10 text-center">
            <FiFileText className="mx-auto text-gray-400 mb-3" size={30} />

            <h3 className="font-semibold">No proposals yet</h3>

            <p className="text-sm text-gray-500 mt-1">
              Browse tasks and submit your first proposal
            </p>

            <Link
              href="/browse-tasks"
              className="
              inline-block mt-4 px-5 py-2
              rounded-xl text-white
              bg-gradient-to-r
              from-cyan-500 to-purple-600"
            >
              Browse Tasks
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {proposals.slice(0, 5).map((p) => (
              <div
                key={p._id}
                className="
                bg-white border rounded-2xl p-4
                flex justify-between items-center
                hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold text-2xl text-cyan-500">
                    {p.taskTitle}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Budget: ${p.proposedBudget} • {p.estimatedDays} days
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Created:{" "}
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium

                  ${
                    p.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : p.status === "accepted" || p.status === "In Progress"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                  }
                  `}
                >
                  {p.status === "In Progress" ? "Accepted" : p.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
