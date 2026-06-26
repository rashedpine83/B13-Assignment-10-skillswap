"use client";

import { createTask } from "@/lib/actions/tasks";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiClipboard } from "react-icons/fi";

export default function CreateTaskPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
  });

  const { data: session, isPending } = useSession();
  if (isPending) {
    return <div>Loading...</div>;
  }
  const user = session?.user;
  console.log(user);

  const handleChange = (e) => {
    setForm({
      ...form,
      clientId: user?.id,
      emailId: user?.email,
      status: "open",
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createTask(form);

      if (res.insertedId) {
        toast.success("Task created successfully");

        setForm({
          title: "",
          description: "",
          category: "",
          budget: "",
          deadline: "",
        });
        router.push("/dashboard/client/tasks");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleCancel = () => {
    setForm({
      title: "",
      description: "",
      category: "",
      budget: "",
      deadline: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-purple-100 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-purple-200 p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xl shadow-md">
            <FiClipboard />
          </div>

          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-700 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Post a New Task
            </h1>

            <p className="text-sm text-gray-500">
              Fill out the details to create your task
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="Example: Build a responsive portfolio website"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Description
            </label>

            <textarea
              name="description"
              rows="2"
              placeholder="Describe requirements, features, expectations, and other details..."
              value={form.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className=" px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="">Select a category</option>

              <option value="Design">Design</option>

              <option value="Development">Development</option>

              <option value="Writing">Writing</option>

              <option value="Marketing">Marketing</option>

              <option value="Other">Other</option>
            </select>
          </div>

          {/* Budget + Deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget ($)
              </label>

              <input
                type="number"
                name="budget"
                placeholder="Example: 100"
                value={form.budget}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>

              <input
                type="datetime-local"
                name="deadline"
                value={form.deadline}
                onChange={(e) => {
                  handleChange(e);

                  // picker close
                  e.target.blur();
                }}
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-3">
            <button
              type="button"
              onClick={handleCancel}
              className="w-1/2 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
            >
              Post Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
