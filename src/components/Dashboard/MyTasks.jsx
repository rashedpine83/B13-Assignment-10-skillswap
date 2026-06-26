"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiSearch,
  FiCalendar,
  FiDollarSign,
  FiRotateCcw,
} from "react-icons/fi";

export default function MyTasks({ tasks }) {
  console.log(tasks);
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  // Status badge colors
  const statusColor = {
    open: "bg--100 text-orange-700 border border-orange-300",

    completed: "bg-green-100 text-green-700 border border-green-300",

    "In Progress": "bg-purple-100 text-purple-700 border border-purple-300",
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

      const matchCategory = !category || task.category === category;

      const matchStatus = !status || task.status === status;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [tasks, search, category, status]);

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setStatus("");
  };

  return (
    <div className="p-6 pt-15 lg:pt-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold bg-linear-to-r from-purple-700 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            My Tasks
          </h1>

          <p className="text-gray-500">Manage all your posted tasks</p>
        </div>

        <button
          onClick={() => router.push("/dashboard/client/tasks/new-task")}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-5 py-2 rounded-xl font-medium"
        >
          + Post New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-xl w-72 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded-xl"
        >
          <option value="">All Categories</option>

          <option>Development</option>

          <option>Design</option>

          <option>Marketing</option>

          <option>Writing</option>
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 border rounded-xl"
        >
          <option value="">All Status</option>

          <option value="open">Open</option>

          <option value="completed">Completed</option>

          <option value="in-progress">In Progress</option>
        </select>

        {/* Reset */}
        <button
          onClick={resetFilters}
          className="flex items-center gap-2 px-4 py-2 border rounded-xl hover:bg-gray-50"
        >
          <FiRotateCcw />
          Reset
        </button>
      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 gap-5">
        {[...filteredTasks]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((task) => (
            <div
              key={task._id}
              onClick={() => router.push(`/dashboard/client/tasks/${task._id}`)}
              className="cursor-pointer bg-white rounded-2xl border p-5 hover:shadow-lg transition hover:border-cyan-300"
            >
              {/* Top */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="font-bold text-lg">{task.title}</h2>

                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {task.description}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusColor[task.status]
                  }`}
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
                  <FiDollarSign />${task.budget}
                </div>

                <div className="flex items-center gap-1">
                  <FiCalendar />

                  {new Date(task.deadline).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-10 text-gray-500">No tasks found</div>
      )}
    </div>
  );
}
