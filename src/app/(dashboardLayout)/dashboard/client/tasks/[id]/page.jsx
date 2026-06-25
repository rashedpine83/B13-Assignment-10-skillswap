import { getTaskById } from "@/lib/api/tasks";
import TaskCard from "@/components/Dashboard/TaskCard";
import ProposalCard2 from "./ProposalCard-2";
import { getProposalsByTaskId } from "@/lib/api/proposals";

const MyTasksDetailsPage = async ({ params }) => {
  const { id } = await params;

  const task = await getTaskById(id);

  const proposals = await getProposalsByTaskId(id);

  return (
    <div>
      <TaskCard task={task} />

      {task?.status !== "In Progress" && task?.status !== "completed" && (
        <ProposalCard2 proposals={proposals ?? []} />
      )}
    </div>
  );
};

export default MyTasksDetailsPage;
