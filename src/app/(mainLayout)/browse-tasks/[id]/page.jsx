
import Link from "next/link";
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiUser,
} from "react-icons/fi";

import { getSingleTask } from "@/lib/api/tasks";
import { getUserSession } from "@/lib/core/session";

const TaskDetailsPage = async ({ params }) => {
  const { id } = await params;

  const task = await getSingleTask(id);

  // ✅ GET USER SESSION
  const user = await getUserSession();

  const isLoggedIn = !!user;
  const role = user?.role;

  return (
    <div className="max-w-4xl mx-auto">

      {/* Back Button */}
      <Link
        href="/browse-tasks"
        className="
        inline-flex items-center gap-2 mb-4
        px-4 py-2
        rounded-lg
        bg-white
        border
        shadow-sm
        hover:border-cyan-400
        hover:text-cyan-600
        text-sm
        transition-all
        "
      >
        <FiArrowLeft size={16} />
        Back
      </Link>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-5">

        {/* Category + Status */}
        <div className="flex flex-wrap gap-2 mb-4">

          <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-medium">
            {task.category}
          </span>

          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium capitalize">
            {task.status}
          </span>

        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
          {task.title}
        </h1>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mt-5">

          <div className="flex items-center gap-3 border rounded-xl p-3">
            <FiDollarSign className="text-cyan-500" />
            <div>
              <p className="text-xs text-gray-400">Budget</p>
              <p className="font-semibold text-cyan-600 text-sm">
                ${task.budget}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border rounded-xl p-3">
            <FiCalendar className="text-purple-500" />
            <div>
              <p className="text-xs text-gray-400">Deadline</p>
              <p className="text-sm font-medium">
                {new Date(task.deadline).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border rounded-xl p-3">
            <FiClock className="text-cyan-500" />
            <div>
              <p className="text-xs text-gray-400">Posted</p>
              <p className="text-sm font-medium">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 border rounded-xl p-3">
            <FiUser className="text-purple-500" />
            <div>
              <p className="text-xs text-gray-400">Client</p>
              <p className="text-sm font-medium break-all">
                {task.emailId}
              </p>
            </div>
          </div>

        </div>

        {/* Description */}
        <div className="mt-5 border-t pt-4">
          <h2 className="text-lg font-bold mb-2">
            Description
          </h2>

          <p className="text-gray-600 text-sm leading-6">
            {task.description}
          </p>
        </div>

        {/* ✅ CONDITIONAL RENDERING */}
        {!isLoggedIn || role !== "freelancer" ? (
          // ================================
          // ❌ NOT LOGGED IN → SIGN IN CARD
          // ================================
          <div className="
            mt-6
            rounded-2xl
            border
            border-gray-100
            bg-gradient-to-r
            from-cyan-50
            to-purple-50
            p-5
            hover:shadow-md
            hover:scale-[1.01]
            transition-all
            text-center
          ">
            <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Sign in as a freelancer to submit a proposal
            </h3>

            <p className="text-gray-500 text-xs mt-2">
              Login required to apply for this task
            </p>

            <Link href="/signin">
              <button className="
                mt-4
                px-6 py-2
                rounded-xl
                text-white
                text-sm
                font-medium
                bg-gradient-to-r
                from-cyan-500
                to-purple-600
                hover:scale-105
                transition-all
              ">
                Sign In
              </button>
            </Link>
          </div>
        ) : (
          // ================================
          // ✅ LOGGED IN FREELANCER → FORM
          // ================================
          <div className="
            mt-6
            rounded-2xl
            border
            border-gray-100
            p-5
            shadow-sm
          ">

            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              🚀 Submit a Proposal
            </h2>

            <form className="grid gap-4">

              {/* Proposed Budget */}
              <div>
                <label className="text-sm font-medium">
                  Proposed Budget (USD)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50"
                  className="w-full mt-1 border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* Estimated Days */}
              <div>
                <label className="text-sm font-medium">
                  Estimated Days
                </label>
                <input
                  type="number"
                  placeholder="e.g. 3"
                  className="w-full mt-1 border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* Cover Note */}
              <div>
                <label className="text-sm font-medium">
                  Cover Note
                </label>
                <textarea
                  placeholder="Explain why you're best..."
                  className="w-full mt-1 border rounded-xl px-3 py-2 h-24 outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* Submit */}
              <button
                type="button"
                className="
                  w-full
                  py-2
                  rounded-xl
                  text-white
                  bg-gradient-to-r
                  from-orange-500
                  to-red-500
                  hover:scale-[1.02]
                  transition
                "
              >
                Submit Proposal
              </button>

            </form>

          </div>
        )}

      </div>
    </div>
  );
};

export default TaskDetailsPage;