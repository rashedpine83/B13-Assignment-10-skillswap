import { getTask } from "@/lib/api/tasks";
import BrowseTasksClient from "./BrowseTaskClient";

const BrowseTaskspage = async ({ searchParams }) => {
  const params = await searchParams;

  const query = new URLSearchParams(Object.entries(params || {})).toString();

  const tasks = await getTask(query);

  return <BrowseTasksClient tasks={tasks} />;
};

export default BrowseTaskspage;
