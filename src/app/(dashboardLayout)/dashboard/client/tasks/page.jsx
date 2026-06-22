import MyTasks from "@/components/Dashboard/MyTasks";
import { getClientTasks } from "@/lib/api/tasks";
import { getUserSession } from "@/lib/core/session";
import { useSession } from "@/lib/auth-client";

export default async function Page() {
 
  const user = await getUserSession();

  const emailId = user?.email;
  const tasksData = await getClientTasks(emailId);
  return <MyTasks tasks={tasksData} />;
}
