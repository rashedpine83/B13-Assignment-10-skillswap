import { getTaskById } from "@/lib/api/tasks";
import TaskCard from "@/components/Dashboard/TaskCard";

const MyTasksDetailsPage = async ({ params }) => {
  const { id } = await params;

  const task = await getTaskById(id);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <TaskCard task={task} />
    </div>
  );
};

export default MyTasksDetailsPage;
