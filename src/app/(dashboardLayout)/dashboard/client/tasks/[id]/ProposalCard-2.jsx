"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiCheck, FiX, FiUser, FiInbox } from "react-icons/fi";
import { updateProposalStatus } from "@/lib/actions/proposal";

export default function ProposalCard2({ proposals }) {
  const router = useRouter();

  const [proposalData, setProposalData] = useState([]);

  useEffect(() => {
    setProposalData(Array.isArray(proposals) ? proposals : []);
  }, [proposals]);

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
    router.push(`/dashboard/client/proposals/${proposal._id}`);
  };

  return (
    <div className="border rounded-2xl p-6 bg-white shadow-sm mt-6">
      <h2 className="font-bold text-lg mb-5">
        Proposals ({proposalData.length})
      </h2>

      {/* Empty State */}

      {!proposalData.length ? (
        <div
          className="
          rounded-2xl
          border-2
          border-dashed
          border-gray-200
          bg-gray-50
          p-12
          text-center
        "
        >
          <div className="flex justify-center">
            <div
              className="
              h-20
              w-20
              rounded-full
              bg-white
              shadow
              flex
              items-center
              justify-center
            "
            >
              <FiInbox size={35} className="text-gray-400" />
            </div>
          </div>

          <h3 className="font-semibold text-lg mt-5">No Proposals Available</h3>

          <p className="text-gray-500 mt-2">
            No freelancer has submitted a proposal for this task yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {proposalData.map((p) => (
            <div
              key={p._id}
              className="
              border
              rounded-xl
              p-5
              hover:shadow-md
              transition
            "
            >
              <div className="flex justify-between">
                <div className="flex-1">
                  {/* user icon + email */}

                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <FiUser />
                    </div>

                    <h3 className="font-medium">{p.clientEmailId}</h3>
                  </div>

                  {/* details */}

                  <div
                    className="
                    flex
                    gap-4
                    mt-3
                    text-sm
                    text-gray-500
                    flex-wrap
                  "
                  >
                    <span>${p.proposedBudget}</span>

                    <span>{p.estimatedDays} days</span>

                    <span>
                      {new Date(p.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <p className="mt-4 text-gray-700">{p.coverNote}</p>

                  <div className="flex gap-3 mt-5">
                    {p.status !== "rejected" ? (
                      <>
                        <button
                          onClick={() => handleAccept(p)}
                          className="
                          bg-green-600
                          hover:bg-green-700
                          text-white
                          px-4
                          py-2
                          rounded-md
                          flex
                          items-center
                          gap-2
                        "
                        >
                          <FiCheck />
                          Accept
                        </button>

                        <button
                          onClick={() => handleReject(p._id)}
                          className="
                          bg-red-50
                          hover:bg-red-100
                          text-red-600
                          px-4
                          py-2
                          rounded-md
                          flex
                          items-center
                          gap-2
                        "
                        >
                          <FiX />
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        disabled
                        className="
                        bg-red-100
                        text-red-600
                        px-4
                        py-2
                        rounded-md
                        cursor-not-allowed
                      "
                      >
                        Rejected
                      </button>
                    )}
                  </div>
                </div>

                {/* status */}

                <div>
                  <span
                    className="
                    bg-yellow-100
                    text-yellow-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                  "
                  >
                    {p.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
