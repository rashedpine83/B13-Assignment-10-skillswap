import { getUserSession } from "@/lib/core/session";
import ProposalCards from "./ProposalCards";
import { getProposalsByEmail } from "@/lib/api/proposals";

export default async function ClientProposalsPage() {
  const user = await getUserSession();

  const proposals = await getProposalsByEmail(user?.email);
  console.log("client", proposals);

  return (
    <div className="p-10">
      <div className="mb-8">
        <h1 className=" pb-2 text-4xl font-bold bg-gradient-to-r from-purple-700 via-pink-500 to-orange-400 bg-clip-text text-transparent">
          Manage Proposals
        </h1>

        <p className="text-gray-500 mt-2">
          Review and respond to freelancer proposals
        </p>
      </div>

      <ProposalCards proposals={proposals} />
    </div>
  );
}
