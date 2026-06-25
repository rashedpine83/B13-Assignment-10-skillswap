// import PaymentButton from "@/components/PaymentButton";
import { getProposalsById } from "@/lib/api/proposals";
import Link from "next/link";

export default async function PaymentPage({ params }) {
  const { id } = await params;

  const proposal = await getProposalsById(id);

  if (!proposal) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>No proposal found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] px-6 py-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
        {/* LEFT SIDE */}
        <div>
          {/* Back */}
          <Link href="/dashboard/client/proposals">
            <button className="flex items-center text-gray-500 mb-8 hover:text-black">
              ← Back to proposals
            </button>
          </Link>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2 rounded-lg">📁</div>

            <div>
              <h1 className="font-bold text-xl text-cyan-500">SkillSwap</h1>

              <p className="text-gray-500 text-sm">Secure Checkout</p>
            </div>
          </div>

          {/* Price */}
          <h2 className="text-5xl font-bold mt-10">
            ${proposal.proposedBudget}
          </h2>

          <p className="text-gray-500 mt-2">Total due today</p>

          {/* Summary Card */}
          <div className="bg-white border rounded-3xl p-6 mt-8 shadow-sm">
            <div className="flex justify-between mb-4">
              <span className="text-gray-500">Task</span>

              <span className="font-medium">{proposal.taskTitle}</span>
            </div>

            <div className="flex justify-between mb-4">
              <span className="text-gray-500">Freelancer</span>

              <span className="font-medium">{proposal.freelancerEmailId}</span>
            </div>

            <div className="flex justify-between mb-5">
              <span className="text-gray-500">Amount</span>

              <span>${proposal.proposedBudget}</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-xl">
              <span>Total</span>

              <span>${proposal.proposedBudget}</span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
            <span className="text-green-500">🛡️</span>
            Your payment is secured with end-to-end encryption
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              💳
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Confirm & Pay
              </h2>

              <p className="text-sm text-gray-500">
                Secure payment powered by Stripe
              </p>
            </div>
          </div>

          {/* Test Card Notice */}
          <div
            className="
    mb-6
    bg-orange-50
    border
    border-orange-200
    rounded-2xl
    p-4
  "
          >
            <p className="text-sm text-orange-700">
              <span className="font-semibold">Test Mode:</span> Use card:
              <span className="font-bold ml-1">4242 4242 4242 4242</span>
            </p>

            <p className="text-xs text-orange-500 mt-1">
              Any future date and any 3 digit CVC
            </p>
          </div>
          {console.log(proposal)}
          <form action="/api/payment" method="POST">
            {/* Keep your existing hidden inputs unchanged */}

            <input type="hidden" name="price" value={proposal.proposedBudget} />

            <input type="hidden" name="title" value={proposal.taskTitle} />

            <input type="hidden" name="taskId" value={proposal.taskId} />

            <input
              type="hidden"
              name="freelancerEmailId"
              value={proposal.freelancerEmailId}
            />

            <input
              type="hidden"
              name="clientEmailId"
              value={proposal.clientEmailId}
            />
            <input type="hidden" name="proposalId" value={proposal._id} />

            <input type="hidden" name="status" value={proposal.status} />

            {/* Payment Summary */}

            <div
              className="
      rounded-2xl
      bg-gray-50
      border
      p-5
      mb-6
    "
            >
              <div className="flex justify-between mb-3">
                <span className="text-gray-500">Service</span>

                <span className="font-medium">{proposal.taskTitle}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total Amount</span>

                <span
                  className="
          text-2xl
          font-bold
          text-green-600
        "
                >
                  ${proposal.proposedBudget}
                </span>
              </div>
            </div>

            {/* Payment Button */}

            <button
              type="submit"
              className="
        w-full
        h-14
        rounded-2xl
        bg-gradient-to-r
        from-green-500
        to-emerald-600
        hover:scale-[1.02]
        hover:shadow-xl
        text-white
        font-semibold
        text-lg
        transition-all
        duration-300
        flex
        items-center
        justify-center
        gap-3
      "
            >
              🔒 Pay ${proposal.proposedBudget}
            </button>
          </form>

          <p
            className="
    text-xs
    text-gray-400
    text-center
    mt-6
  "
          >
            By confirming your payment, you agree to SkillSwap Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}
