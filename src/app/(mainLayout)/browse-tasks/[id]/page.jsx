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
import ProposalForm from "./ProposalForm";

const TaskDetailsPage = async ({ params }) => {
  const { id } = await params;

  const task = await getSingleTask(id);
  const user = await getUserSession();

  const isLoggedIn = !!user;
  const role = user?.role;

  return (
    <div className="max-w-4xl mx-auto p-5">
      <Link
        href="/browse-tasks"
        className="flex items-center gap-2 mb-6 text-cyan-600 hover:text-purple-600"
      >
        <FiArrowLeft />
        Back
      </Link>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs">
            {task.category}
          </span>

          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs capitalize">
            {task.status}
          </span>
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
          {task.title}
        </h1>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="flex items-center gap-3 border rounded-xl p-3">
            <FiDollarSign className="text-cyan-500" />
            <div>
              <p className="text-xs text-gray-400">Budget</p>
              <p className="font-semibold text-cyan-600">${task.budget}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border rounded-xl p-3">
            <FiCalendar className="text-purple-500" />
            <div>
              <p className="text-xs text-gray-400">Deadline</p>
              <p>{new Date(task.deadline).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border rounded-xl p-3">
            <FiClock className="text-cyan-500" />
            <div>
              <p className="text-xs text-gray-400">Posted</p>
              <p>{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border rounded-xl p-3">
            <FiUser className="text-purple-500" />
            <div>
              <p className="text-xs text-gray-400">Client</p>
              <p>{task.emailId}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 border-t pt-4">
          <h2 className="font-bold mb-2">Description</h2>
          <p className="text-gray-600">{task.description}</p>
        </div>

        {!isLoggedIn || role !== "freelancer" ? (
          <div className="mt-6 rounded-2xl bg-gradient-to-r from-cyan-50 to-purple-50 p-5 text-center">
            <h3 className="font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Sign in as a freelancer to submit a proposal
            </h3>

            <Link href="/signin">
              <button className="mt-4 px-6 py-2 rounded-xl text-white bg-gradient-to-r from-cyan-500 to-purple-600">
                Sign In
              </button>
            </Link>
          </div>
        ) : (
          <ProposalForm
            taskId={task._id}
            taskTitle={task.title}
            freelancerId={user._id}
            freelancerEmailId={user?.email}
            clientEmailId={task.emailId}
            alreadySubmitted={task.alreadySubmitted}
          />
        )}
      </div>
    </div>
  );
};

export default TaskDetailsPage;
