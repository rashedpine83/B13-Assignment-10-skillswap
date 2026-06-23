import { getProposalsByEmail } from "@/lib/api/proposals";
import { getUserSession } from "@/lib/core/session";
import ProposalCards from "./ProposalCards";

export default async function ClientProposalsPage() {
  const user = await getUserSession();

  const proposals = await getProposalsByEmail(user.email);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-cyan-600">Manage Proposals</h1>

        <p className="text-gray-500 mt-1">
          Review and respond to freelancer proposals
        </p>
      </div>

      <ProposalCards proposals={proposals} />
    </div>
  );
}
