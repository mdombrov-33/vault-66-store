import { getSkillRecord } from "@/utils/actions/goat";
import { getAuthUser } from "@/utils/auth/get-user";
import GoatFlowWrapper from "@/components/profile/goat/GoatPageWrapper";

export default async function GoatPage() {
  const user = await getAuthUser();
  const skills = await getSkillRecord(user.id);

  return <GoatFlowWrapper skills={skills!} />;
}
