import GoatTest from "@/components/profile/goat/GoatTest";
import { getSkillRecord } from "@/utils/actions/goat";
import { getAuthUser } from "@/utils/auth/get-user";

export default async function GoatPage() {
  const user = await getAuthUser();
  const skills = await getSkillRecord(user.id);

  return <GoatTest skills={skills} />;
}
