"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { createProposal } from "@/lib/actions/proposal";

export default function ProposalForm({
  taskId,
  taskTitle,
  freelancerId,
  freelancerEmailId,
  clientEmailId,
  alreadySubmitted = false,
}) {
  const [submitted, setSubmitted] = useState(alreadySubmitted);

  const [form, setForm] = useState({
    proposedBudget: "",
    estimatedDays: "",
    coverNote: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const proposalData = {
        ...form,
        taskId,
        taskTitle,
        freelancerId,
        clientEmailId,
        freelancerEmailId,
        status: "pending",
      };

      const res = await createProposal(proposalData);

      if (res?.success) {
        toast.success("Proposal submitted successfully");

        setSubmitted(true);

        setForm({
          proposedBudget: "",
          estimatedDays: "",
          coverNote: "",
        });
      } else {
        toast.error(res.message || "Proposal already submitted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className="
      mt-6
      rounded-2xl
      border
      border-gray-100
      p-5
      shadow-sm
    "
    >
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        🚀 Submit a Proposal
      </h2>

      {submitted ? (
        <div
          className="
          rounded-xl
          p-4
          bg-gradient-to-r
          from-cyan-50
          to-purple-50
          border
        "
        >
          <h2 className="text-lg font-bold mb-2">Submitted Proposal</h2>
          <p className="font-medium text-purple-700">
            You have already submitted a proposal for this task.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="text-sm font-medium">Proposed Budget</label>

            <input
              name="proposedBudget"
              type="number"
              value={form.proposedBudget}
              onChange={handleChange}
              required
              className="
              w-full
              mt-1
              border
              rounded-xl
              px-3
              py-2
              outline-none
              focus:ring-2
              focus:ring-cyan-400
            "
            />
          </div>

          <div>
            <label className="text-sm font-medium">Estimated Days</label>

            <input
              name="estimatedDays"
              type="number"
              value={form.estimatedDays}
              onChange={handleChange}
              required
              className="
              w-full
              mt-1
              border
              rounded-xl
              px-3
              py-2
              outline-none
              focus:ring-2
              focus:ring-cyan-400
            "
            />
          </div>

          <div>
            <label className="text-sm font-medium">Cover Note</label>

            <textarea
              name="coverNote"
              value={form.coverNote}
              onChange={handleChange}
              required
              className="
              w-full
              mt-1
              border
              rounded-xl
              px-3
              py-2
              h-24
              outline-none
              focus:ring-2
              focus:ring-cyan-400
            "
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-xl
              text-white
              bg-gradient-to-r
              from-cyan-500
              to-purple-600
              hover:scale-[1.02]
              transition
            "
          >
            Submit Proposal
          </button>
        </form>
      )}
    </div>
  );
}
