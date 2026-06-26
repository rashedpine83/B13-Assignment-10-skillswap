import MyTasks from "@/components/Dashboard/MyTasks";
import { getTaskByClientEmail } from "@/lib/api/tasks";

import { getUserSession } from "@/lib/core/session";

export default async function MyTaskPage() {
  const user = await getUserSession();

  const tasksData = await getTaskByClientEmail(user?.email);
  return <MyTasks tasks={tasksData} />;
}
