"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiDollarSign, FiClock, FiCheck, FiX } from "react-icons/fi";
import { updateProposalStatus } from "@/lib/actions/proposal";

export default function ProposalCards({ proposals }) {
  const router = useRouter();

  const [proposalData, setProposalData] = useState(proposals);

  const handleReject = async (id) => {
    try {
      await updateProposalStatus(id, "rejected");

      setProposalData((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                status: "rejected",
              }
            : item,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = (proposal) => {
    router.push(`/payment/${proposal._id}`);

    // Later connect Stripe checkout here
  };

  return (
    <div className="space-y-6">
      {proposalData.map((p) => (
        <div
          key={p._id}
          className="
          bg-white
          rounded-3xl
          border
          border-gray-200
          p-6
          shadow-sm
          hover:shadow-xl
          transition-all
        "
        >
          <div className="flex justify-between">
            {/* LEFT */}

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-lg">{p.title}</h2>

                <span
                  className={`
                  px-3 py-1
                  text-xs
                  rounded-full
                  font-medium

                  ${
                    p.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : p.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }
                `}
                >
                  {p.status}
                </span>
              </div>

              <p className="text-gray-500 mt-2">
                from{" "}
                <span className="font-medium text-black">
                  {p.clientEmailId}
                </span>
              </p>

              <div className="bg-gray-50 rounded-xl p-3 mt-4 text-gray-500">
                {p.coverNote}
              </div>

              <div className="flex gap-6 mt-5 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FiDollarSign />
                  Bid:
                  <span className="font-bold text-yellow-500">
                    ${p.proposedBudget}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <FiClock />
                  {p.estimatedDays} days
                </div>

                <div>
                  {new Date(p.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>

            {/* BUTTONS */}

            {p.status === "pending" && (
              <div className="flex gap-3 items-start">
                <button
                  onClick={() => handleAccept(p)}
                  className="
                  bg-green-500
                  hover:bg-green-600
                  text-white
                  px-4
                  py-2
                  rounded-xl
                  flex
                  items-center
                  gap-2
                  text-sm
                "
                >
                  <FiCheck />
                  Accept
                </button>

                <button
                  onClick={() => handleReject(p._id)}
                  className="
                  border
                  text-red-500
                  px-4
                  py-2
                  rounded-xl
                  flex
                  items-center
                  gap-2
                  hover:bg-red-50
                  text-sm
                "
                >
                  <FiX />
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
