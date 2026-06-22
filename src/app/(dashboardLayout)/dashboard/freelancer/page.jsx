"use client";

import {
  FiFileText,
  FiClock,
  FiCheckCircle,
  FiDollarSign,
  FiSearch,
} from "react-icons/fi";

import Link from "next/link";

export default function FreelancerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-15 lg:pt-6">

      {/* HEADER */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
            Freelancer Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Track your proposals and earnings
          </p>
        </div>

        {/* ORANGE BUTTON */}
        <Link
          href="/browse-tasks"
          className="
            flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium
           bg-gradient-to-r
            from-cyan-500
            to-purple-600
            hover:from-orange-600 hover:to-orange-700
            hover:shadow-lg hover:scale-105
            transition-all
          "
        >
          <FiSearch />
          Browse Tasks
        </Link>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* CARD */}
        {[
          {
            title: "Total Proposals",
            value: "0",
            desc: "Proposals submitted",
            icon: <FiFileText />,
            color: "cyan",
          },
          {
            title: "Pending",
            value: "0",
            desc: "Awaiting response",
            icon: <FiClock />,
            color: "purple",
          },
          {
            title: "Accepted",
            value: "0",
            desc: "Proposals accepted",
            icon: <FiCheckCircle />,
            color: "green",
          },
          {
            title: "Total Earned",
            value: "$0",
            desc: "From completed tasks",
            icon: <FiDollarSign />,
            color: "orange",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="
              bg-white rounded-2xl p-5 border border-gray-100
              shadow-sm transition-all duration-300
              hover:shadow-xl hover:-translate-y-1
              hover:border-cyan-400
            "
          >
            <div className="flex items-center justify-between">

              {/* TEXT */}
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h2 className="text-2xl font-bold">{item.value}</h2>
                <p className="text-xs text-gray-400 mt-1">
                  {item.desc}
                </p>
              </div>

              {/* ICON WITH HOVER */}
              <div
                className="
                  p-3 rounded-xl bg-gray-50
                  text-gray-500
                  transition-all duration-300
                  hover:scale-110
                  hover:shadow-lg
                  hover:text-cyan-600
                  hover:bg-cyan-50
                "
              >
                {item.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* RECENT PROPOSALS */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-3">
          Recent Proposals
        </h2>

        <div
          className="
            bg-white border border-gray-100 rounded-2xl p-10 text-center
            transition-all duration-300
            hover:border-purple-300 hover:shadow-lg
          "
        >

          <div className="flex justify-center mb-3">
            <div
              className="
                p-4 rounded-full bg-gray-100 text-gray-500
                transition-all duration-300
                hover:scale-110 hover:text-cyan-600
              "
            >
              <FiFileText size={26} />
            </div>
          </div>

          <h3 className="text-lg font-semibold">
            No proposals yet
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Browse available tasks and submit your first proposal
          </p>

          {/* ORANGE BUTTON */}
          <Link
            href="/browse-tasks"
            className="
              inline-block mt-4 px-5 py-2 rounded-xl text-white text-sm font-medium
              bg-gradient-to-r
            from-cyan-500
            to-purple-600
              hover:from-orange-600 hover:to-orange-700
              hover:scale-105 hover:shadow-lg
              transition-all
            "
          >
            Browse Tasks
          </Link>

        </div>
      </div>
    </div>
  );
}