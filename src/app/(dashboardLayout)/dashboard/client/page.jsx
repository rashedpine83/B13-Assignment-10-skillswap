"use client";

import {
  ClipboardList,
  Clock3,
  CircleDollarSign,
  CheckCircle,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function ClientOverview() {
  const stats = [
    {
      title: "Total Tasks",
      value: "0",
      desc: "All tasks created",
      icon: ClipboardList,
    },
    {
      title: "Open Tasks",
      value: "0",
      desc: "Awaiting proposals",
      icon: Clock3,
    },
    {
      title: "In Progress",
      value: "0",
      desc: "Currently being worked on",
      icon: CheckCircle,
    },
    {
      title: "Total Spent",
      value: "$0",
      desc: "Total money paid",
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
            Client Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your tasks and find talented freelancers
          </p>
        </div>

        <Link href={"/dashboard/client/tasks/new-task"}>
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
          duration-300
          "
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
              transition-all
              duration-300
              "
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
                  justify-center
                  "
                >
                  <Icon size={24} className="text-purple-600" />
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
        p-10
        "
      >
        <h2 className="text-2xl font-bold mb-10">Recent Tasks</h2>

        <div className="flex flex-col items-center justify-center py-20">
          <div
            className="
            h-28
            w-28
            rounded-full
            bg-gradient-to-r
            from-cyan-100
            to-purple-100
            flex
            items-center
            justify-center
            mb-6
            "
          >
            <ClipboardList className="text-purple-600" size={45} />
          </div>

          <h3 className="text-3xl font-bold">No tasks yet</h3>

          <p className="text-gray-500 mt-3">
            Post your first task and connect with talented freelancers
          </p>

          <Link href={"/dashboard/client/tasks/new-task"}>
            <button
              className="
            mt-8
            px-8
            py-3
            rounded-xl
            text-white
            bg-gradient-to-r
            from-cyan-500
            to-purple-600
            hover:scale-105
            transition-all
            "
            >
              Post a Task
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
