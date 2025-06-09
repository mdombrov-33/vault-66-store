import { getGoatCompletionStatus, getSkillRecord } from "@/utils/actions/goat";
import { getAuthUser } from "@/utils/auth/get-user";
import GoatFlowWrapper from "@/components/profile/goat/GoatPageWrapper";

export default async function GoatPage() {
  const user = await getAuthUser();

  const [rawSkills, isGoatCompleted] = await Promise.all([
    getSkillRecord(user.id),
    getGoatCompletionStatus(user.id),
  ]);

  const skills = {
    ...rawSkills,
    isGoatCompleted: isGoatCompleted ?? false,
  };

  return <GoatFlowWrapper isGoatCompleted={isGoatCompleted} skills={skills!} />;
}
