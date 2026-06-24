// components/PaymentButton.jsx

"use client";

export default function PaymentButton({ proposal }) {
  const handlePayment = async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          proposalId: proposal._id,

          taskTitle: proposal.coverNote,

          freelancerEmail: proposal.freelancerEmailId,

          amount: proposal.proposedBudget,
        }),
      });

      const data = await response.json();

      window.location.href = data.url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border rounded-xl p-6">
      <button
        onClick={handlePayment}
        className="
        bg-orange-500
        w-full
        py-4
        rounded-lg
        text-white
        font-semibold
      "
      >
        Pay ${proposal.proposedBudget}
      </button>
    </div>
  );
}
