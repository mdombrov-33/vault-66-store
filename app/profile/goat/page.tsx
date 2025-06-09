import { getGoatCompletionStatus, getSkillRecord } from "@/utils/actions/goat";
import GoatFlowWrapper from "@/components/profile/goat/GoatPageWrapper";

export default async function GoatPage() {
  const [rawSkills, isGoatCompleted] = await Promise.all([
    getSkillRecord(),
    getGoatCompletionStatus(),
  ]);

  const skills = {
    ...rawSkills,
    isGoatCompleted: isGoatCompleted ?? false,
  };

  return <GoatFlowWrapper isGoatCompleted={isGoatCompleted} skills={skills!} />;
}
