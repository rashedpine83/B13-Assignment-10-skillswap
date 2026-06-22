import Link from "next/link";
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiUser,
} from "react-icons/fi";

import { getSingleTask } from "@/lib/api/tasks";

const TaskDetailsPage = async ({ params }) => {
  const { id } = await params;

  const task = await getSingleTask(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-purple-50 py-10 px-6">

      <div className="max-w-5xl mx-auto">

        {/* Back Button */}

        <Link
          href="/browse-tasks"
          className="
          inline-flex
          items-center
          gap-2
          mb-6
          px-5
          py-3
          rounded-xl
          bg-white
          border
          shadow-sm
          hover:border-cyan-400
          hover:text-cyan-600
          transition-all
        "
        >
          <FiArrowLeft />
          Back
        </Link>

        {/* Main Card */}

        <div
          className="
          bg-white
          rounded-[35px]
          border
          border-gray-100
          shadow-xl
          p-8
          hover:shadow-cyan-100
          transition-all
          duration-300
        "
        >

          {/* Category + Status */}

          <div className="flex flex-wrap gap-3 mb-6">

            <span className="px-4 py-1 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium">
              {task.category}
            </span>

            <span className="px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium capitalize">
              {task.status}
            </span>

          </div>

          {/* Title */}

          <h1
            className="
            text-4xl
            md:text-5xl
            font-extrabold
            bg-gradient-to-r
            from-cyan-500
            to-purple-600
            bg-clip-text
            text-transparent
          "
          >
            {task.title}
          </h1>

          

          {/* Information Grid */}

          <div className="grid md:grid-cols-2 gap-5 mt-10">

            <div className="flex items-center gap-4 border rounded-2xl p-5 hover:border-cyan-300 transition">

              <div className="p-3 rounded-xl bg-cyan-100 text-cyan-600 text-xl">
                <FiDollarSign />
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Budget
                </p>

                <p className="font-bold text-2xl text-cyan-600">
                  ${task.budget}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4 border rounded-2xl p-5 hover:border-purple-300 transition">

              <div className="p-3 rounded-xl bg-purple-100 text-purple-600 text-xl">
                <FiCalendar />
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Deadline
                </p>

                <p className="font-semibold">
                  {new Date(
                    task.deadline
                  ).toLocaleDateString()}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4 border rounded-2xl p-5 hover:border-cyan-300 transition">

              <div className="p-3 rounded-xl bg-cyan-100 text-cyan-600 text-xl">
                <FiClock />
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Posted
                </p>

                <p className="font-semibold">
                  {new Date().toLocaleDateString()}
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4 border rounded-2xl p-5 hover:border-purple-300 transition">

              <div className="p-3 rounded-xl bg-purple-100 text-purple-600 text-xl">
                <FiUser />
              </div>

              <div>
                <p className="text-gray-400 text-sm">
                  Client Email
                </p>

                <p className="font-semibold break-all">
                  {task.emailId}
                </p>
              </div>

            </div>

          </div>

          {/* Description */}

          <div className="mt-10 border-t pt-8">

            <h2 className="text-2xl font-bold mb-5">
              Description
            </h2>

            <p className="text-gray-600 leading-8">
              {task.description}
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TaskDetailsPage;