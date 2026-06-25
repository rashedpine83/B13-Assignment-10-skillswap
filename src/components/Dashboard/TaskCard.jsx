"use client";

import { deleteTask, updateTask } from "@/lib/actions/tasks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";

import { FaStar } from "react-icons/fa";

export default function TaskCard({ task }) {
  const router = useRouter();

  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [taskStatus, setTaskStatus] = useState(task.status);

  const [showReview, setShowReview] = useState(false);

  const [reviewed, setReviewed] = useState(task.review?.reviewed || false);

  const [reviewData, setReviewData] = useState(task.review || null);

  const [rating, setRating] = useState(task.review?.rating || 5);

  const [comment, setComment] = useState(task.review?.comment || "");

  const [formData, setFormData] = useState({
    title: task.title || "",
    description: task.description || "",
    budget: task.budget || "",
  });

  const statusColor = {
    open: "bg-cyan-100 text-cyan-700 border border-cyan-300",

    completed: "bg-green-100 text-green-700 border border-green-300",

    "In Progress": "bg-purple-100 text-purple-700 border border-purple-300",
  };

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);

      toast.success("Task deleted");

      setShowDeleteModal(false);

      router.push("/dashboard/client/tasks");

      router.refresh();
    } catch (error) {
      toast.error("Delete failed");
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateTask(task._id, formData);

      toast.success("Task updated");

      setShowEdit(false);

      router.refresh();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleComplete = async () => {
    try {
      await updateTask(task._id, {
        status: "completed",
      });

      setTaskStatus("completed");

      toast.success("Task completed");

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleReviewSubmit = async () => {
    if (!comment.trim()) {
      toast.error("Comment required");
      return;
    }

    try {
      const review = {
        rating,
        comment,
        reviewed: true,
        user: "client000@client.com",
      };

      await updateTask(task._id, {
        review,
      });

      setReviewData(review);

      setReviewed(true);

      setShowReview(false);

      toast.success("Review submitted successfully 🎉");

      router.refresh();
    } catch (error) {
      toast.error("Review failed");
    }
  };

  return (
    <>
      {/* Top Title */}

      <div className="flex items-center gap-3 mb-6 mt-6">
        <button onClick={() => router.back()}>
          <FiArrowLeft className="text-xl" />
        </button>

        <h1 className="text-3xl font-bold">{task.title}</h1>
      </div>

      <div className="border rounded-3xl p-8 bg-white shadow-sm">
        {/* TOP */}

        <div className="flex justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor[taskStatus]}`}
            >
              {taskStatus}
            </span>

            <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
              {task.category}
            </span>

            <div className="flex items-center gap-1 text-gray-500">
              <FiDollarSign />${task.budget}
            </div>

            <div className="flex items-center gap-1 text-gray-500">
              <FiCalendar />
              {new Date(task.deadline).toLocaleDateString()}
            </div>
          </div>
        </div>

        <p className="mt-6 text-gray-600">{task.description}</p>

        <hr className="my-6" />

        {/* OPEN STATUS */}

        {taskStatus === "open" && (
          <div className="flex gap-3">
            <button
              onClick={() => setShowEdit(!showEdit)}
              className="
              px-4
              py-2
              rounded-xl
              border
              flex
              items-center
              gap-2
              "
            >
              <FiEdit2 />
              Edit
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="
              px-4
              py-2
              rounded-xl
              border
              text-red-500
              flex
              items-center
              gap-2
              "
            >
              <FiTrash2 />
              Delete
            </button>
          </div>
        )}

        {/* IN PROGRESS */}

        {taskStatus === "In Progress" && (
          <div className="flex items-center gap-4">
            <button
              onClick={handleComplete}
              className="
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-purple-600
              text-white
              flex
              items-center
              gap-2
              "
            >
              <FiCheckCircle />
              Mark as Complete
            </button>

            <span className="px-4 py-1 rounded-full bg-cyan-100 text-cyan-700 border">
              ✓ Paid
            </span>
          </div>
        )}

        {/* COMPLETED */}

        {taskStatus === "completed" && (
          <div className="flex gap-4">
            {!reviewed ? (
              <button
                onClick={() => setShowReview(!showReview)}
                className="
                px-6
                py-3
                rounded-xl
                bg-gradient-to-r
                from-purple-600
                to-cyan-500
                text-white
                shadow-lg
                "
              >
                Leave a Review
              </button>
            ) : (
              <button
                className="
                px-6
                py-3
                rounded-xl
                bg-green-500
                text-white
                flex
                items-center
                gap-2
                "
              >
                <FiCheckCircle />
                Reviewed
              </button>
            )}

            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700">
              Completed
            </span>
          </div>
        )}

        {/* REVIEW FORM */}

        {showReview && (
          <div className="mt-8 rounded-3xl border p-6 bg-gradient-to-br from-purple-50 to-cyan-50">
            <h2 className="font-bold text-xl mb-4">Leave a Review</h2>

            <div className="flex gap-2 mb-5">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was your experience?"
              className="w-full h-28 border rounded-xl p-4"
            />

            <button
              onClick={handleReviewSubmit}
              className="
              mt-5
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-purple-600
              to-cyan-500
              text-white
              "
            >
              Submit Review
            </button>
          </div>
        )}

        {/* REVIEW DISPLAY */}

        {reviewData && (
          <div className="mt-8 border rounded-3xl p-6">
            <h2 className="font-bold mb-4">Reviews</h2>

            <div className="rounded-2xl border p-5 bg-gradient-to-r from-purple-50 to-cyan-50">
              <div className="flex gap-3 items-center">
                <p className="font-medium">{reviewData.user}</p>

                <div className="flex">
                  {[...Array(reviewData.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
              </div>

              <p className="mt-4 text-gray-600">{reviewData.comment}</p>
            </div>
          </div>
        )}

        {/* EDIT FORM */}

        {showEdit && taskStatus === "open" && (
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

      {/* DELETE MODAL */}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-[400px]">
            <h2 className="font-bold text-xl">Delete Task</h2>

            <p className="mt-2">Are you sure?</p>

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
