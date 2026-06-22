import MyTasks from "@/components/Dashboard/MyTasks";
import { getClientTasks } from "@/lib/api/tasks";
import { useSession } from "@/lib/auth-client";
import { getUserSession } from "@/lib/core/session";

export default async function Page() {
  // const { data: session, isPending } = useSession();
  //   if (isPending) {
  //     return <div>Loading...</div>;
  //   }
  //   const user = session?.user.email;
  const user = await getUserSession();

  const emailId = user?.email;
  const tasksData = await getClientTasks(emailId);
  return <MyTasks tasks={tasksData} />;
}
