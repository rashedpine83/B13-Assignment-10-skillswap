import { getTaskById } from "@/lib/api/tasks";

import TaskCard from "@/components/Dashboard/TaskCard";
import ProposalCard2 from "./ProposalCard-2";
import { getProposalsByTaskId } from "@/lib/api/proposals";

const MyTasksDetailsPage = async ({ params }) => {
  const { id } = await params;

  const task = await getTaskById(id);

  const proposals = await getProposalsByTaskId(id);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <TaskCard task={task} />

      {<ProposalCard2 proposals={proposals ?? []} />}
    </div>
  );
};

export default MyTasksDetailsPage;
