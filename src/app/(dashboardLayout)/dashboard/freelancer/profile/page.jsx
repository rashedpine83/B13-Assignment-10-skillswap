import { getUserByEmail } from "@/lib/actions/users";
import EditProfileForm from "./EditProfileForm";

import { getUserSession } from "@/lib/core/session";

export default async function ProfilePage() {
  const userSession = await getUserSession();
  const user = await getUserByEmail(userSession?.email);
  return <EditProfileForm defaultData={user} />;
}
