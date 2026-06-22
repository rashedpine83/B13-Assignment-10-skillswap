import {
  ClipboardList,
  Clock3,
  CircleDollarSign,
  CheckCircle,
  Plus,
} from "lucide-react";

import Link from "next/link";

import {
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";

import { getClientTasks } from "@/lib/api/tasks";
import { getUserSession } from "@/lib/core/session";

export default async function ClientOverview() {
  const user = await getUserSession();

  const emailId = user?.email;
  const tasksData = await getClientTasks(emailId);

  // Dynamic values
  const totalTasks = tasksData?.length || 0;

  const openTasks =
    tasksData?.filter(
      (task) => task.status === "open"
    ).length || 0;

  const inProgressTasks =
    tasksData?.filter(
      (task) => task.status === "in-progress"
    ).length || 0;

  // Only count paid amount
  const totalSpent =
    tasksData?.reduce((sum, task) => {
      return sum + Number(task.paidAmount || 0);
    }, 0) || 0;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      desc: "All tasks created",
      icon: ClipboardList,
    },
    {
      title: "Open Tasks",
      value: openTasks,
      desc: "Awaiting proposals",
      icon: Clock3,
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      desc: "Currently being worked on",
      icon: CheckCircle,
    },
    {
      title: "Total Spent",
      value: `$${totalSpent}`,
      desc: "Total money paid",
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="p-6 pt-16 lg:pt-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            Client Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your tasks and find talented freelancers
          </p>
        </div>

        <Link href="/dashboard/client/tasks/new-task">
          <button
            className="
            flex items-center gap-2
            px-6 py-3
            rounded-xl
            text-white
            bg-gradient-to-r
            from-cyan-500
            to-purple-600
            shadow-lg
            hover:scale-105
            duration-300"
          >
            <Plus size={18} />
            Post New Task
          </button>
        </Link>

      </div>

      {/* Stats */}

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
                  <p className="text-gray-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-4xl font-bold mt-2">
                    {item.value}
                  </h2>

                  <p className="text-gray-400 mt-2 text-sm">
                    {item.desc}
                  </p>
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
                  <Icon
                    size={24}
                    className="text-purple-600"
                  />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Recent Tasks */}

      <div
        className="
        mt-10
        bg-white
        rounded-3xl
        shadow-md
        border
        border-slate-100
        p-8"
      >

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-2xl font-bold">
            Recent Tasks
          </h2>

          <Link
            href="/dashboard/client/tasks"
            className="text-cyan-600 font-medium hover:underline"
          >
            View All
          </Link>

        </div>

        {tasksData?.length > 0 ? (

          <div className="grid md:grid-cols-2 gap-5">

            {tasksData
              .slice(0, 10)
              .map((task) => (

                <Link
                  key={task._id}
                  href={`/dashboard/client/tasks/${task._id}`}
                >

                  <div
                    className="
                    cursor-pointer
                    bg-white
                    rounded-2xl
                    border
                    p-5
                    hover:shadow-lg
                    transition
                    hover:border-cyan-300"
                  >

                    {/* Top */}

                    <div className="flex justify-between items-start mb-3">

                      <div>

                        <h2 className="font-bold text-lg">
                          {task.title}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {task.description}
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        
                        ${
                          task.status === "open"
                            ? "bg-cyan-100 text-cyan-700 border border-cyan-300"
                            : task.status === "completed"
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : "bg-purple-100 text-purple-700 border border-purple-300"
                        }
                        `}
                      >
                        {task.status}
                      </span>

                    </div>

                    {/* Bottom */}

                    <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-gray-600">

                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        {task.category}
                      </span>

                      <div className="flex items-center gap-1">
                        <FiDollarSign />
                        ${task.budget}
                      </div>

                      <div className="flex items-center gap-1">
                        <FiCalendar />

                        {new Date(
                          task.deadline
                        ).toLocaleDateString()}
                      </div>

                    </div>

                  </div>

                </Link>

              ))}

          </div>

        ) : (

          <div className="text-center py-16">

            <ClipboardList
              size={50}
              className="mx-auto text-gray-300"
            />

            <h3 className="text-xl font-semibold mt-4">
              No tasks yet
            </h3>

            <p className="text-gray-500 mt-2">
              Post your first task and connect with freelancers
            </p>

          </div>

        )}

      </div>

    </div>
  );
}