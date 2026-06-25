import { FiFileText, FiSearch } from "react-icons/fi";
import Link from "next/link";
import { getProposals } from "@/lib/api/proposals";
import { getUserSession } from "@/lib/core/session";

export default async function FreelancerOverview() {
  const user = await getUserSession();

  const res = await getProposals(user._id);
  const proposals = res || [];

  // ===== STATS =====
  const totalProposals = proposals.length;

  const pendingProposals = proposals.filter(
    (p) => p.status === "pending",
  ).length;

  const acceptedProposals = proposals.filter(
    (p) => p.status === "accepted",
  ).length;

  const totalEarned = proposals
    .filter((p) => p.status === "accepted")
    .reduce((sum, p) => sum + Number(p.proposedBudget || 0), 0);

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Freelancer Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Track your proposals and earnings
          </p>
        </div>

        <Link
          href="/browse-tasks"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium
          bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition"
        >
          <FiSearch />
          Browse Tasks
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-gray-500 text-sm">Total Proposals</p>
          <h2 className="text-2xl font-bold">{totalProposals}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-2xl font-bold">{pendingProposals}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-gray-500 text-sm">Accepted</p>
          <h2 className="text-2xl font-bold">{acceptedProposals}</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl border">
          <p className="text-gray-500 text-sm">Earned</p>
          <h2 className="text-2xl font-bold">${totalEarned}</h2>
        </div>
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
              className="inline-block mt-4 px-5 py-2 rounded-xl text-white
              bg-gradient-to-r from-cyan-500 to-purple-600"
            >
              Browse Tasks
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {proposals.slice(0, 5).map((p) => (
              <div
                key={p._id}
                className="bg-white border rounded-2xl p-4 flex justify-between items-center
                hover:shadow-md transition"
              >
                {/* LEFT SIDE */}
                <div>
                  <h3 className="font-semibold text-2xl text-cyan-500">
                    {" "}
                    {p.taskTitle}
                  </h3>

                  <p className="text-sm text-gray-500">
                    Budget: ${p.proposedBudget} • {p.estimatedDays} days
                  </p>

                  {/* CREATED DATE */}
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

                {/* STATUS */}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium
    ${
      p.status === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : p.status === "accepted" || p.status === "In Progress"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
    }`}
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
