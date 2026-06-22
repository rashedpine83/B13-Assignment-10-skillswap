"use client";

import { deleteTask, updateTask } from "@/lib/actions/tasks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";

export default function TaskCard({ task }) {
  const router = useRouter();

  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    budget: task.budget || "",
  });

  const statusColor = {
    open: "bg-cyan-100 text-cyan-700 border border-cyan-300",
    completed: "bg-green-100 text-green-700 border border-green-300",
    "in-progress": "bg-purple-100 text-purple-700 border border-purple-300",
  };

  const handleDelete = async () => {
    try {
      const res = await deleteTask(task._id);

      console.log("deleted:", res);

      setShowDeleteModal(false);

      router.push("/dashboard/client/tasks");
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await updateTask(task._id, formData);

      console.log("updated:", res);

      setShowEdit(false);

      router.refresh();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <>
      {/* Back + title */}

      <div className="flex items-center gap-3 mb-6 mt-6">
        <button onClick={() => router.back()}>
          <FiArrowLeft className="text-xl" />
        </button>

        <h1 className="text-3xl font-bold">{task.title}</h1>
      </div>

      <div className="border rounded-2xl p-6 bg-white shadow-sm">
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                statusColor[task.status]
              }`}
            >
              {task.status}
            </span>

            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
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

        <p className="mt-6 text-gray-600">{task.description}</p>

        <hr className="my-6" />

        <div className="flex gap-3">
          {task.status === "open" && (
            <>
              <button
                onClick={() => setShowEdit(!showEdit)}
                className="px-4 py-2 rounded-lg border flex items-center gap-2"
              >
                <FiEdit2 />
                Edit
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 rounded-lg border text-red-500 flex items-center gap-2"
              >
                <FiTrash2 />
                Delete
              </button>
            </>
          )}
        </div>

        {showEdit && (
          <div className="mt-8 border-t pt-6">
            <h2 className="font-bold mb-4">Edit Task</h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                value={formData.budget}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    budget: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3"
              />

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-[400px]">
            <h2 className="font-bold text-xl mb-2">Delete Task</h2>

            <p className="text-gray-500">Are you sure?</p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 rounded-lg text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
