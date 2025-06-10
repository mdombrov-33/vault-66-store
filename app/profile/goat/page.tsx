import GoatPageWrapper from "@/components/profile/goat/GoatPageWrapper";
import {
  getGoatCompletionStatus,
  getInitialSkills,
  getUserFinalSkills,
  getUserTaggedSkills,
} from "@/utils/actions/goat";

export default async function GoatPage() {
  const isGoatCompleted = await getGoatCompletionStatus();

  let skills;
  let taggedSkills: string[] = [];

  if (isGoatCompleted) {
    const finalSkills = await getUserFinalSkills();
    taggedSkills = await getUserTaggedSkills();

    if (!finalSkills) {
      throw new Error(
        "GOAT is marked as completed, but no final skills found somehow."
      );
    }

    skills = { ...finalSkills, isGoatCompleted: true };
  } else {
    const rawSkills = await getInitialSkills();
    skills = { ...rawSkills, isGoatCompleted: false };
  }

  return (
    <GoatPageWrapper
      isGoatCompleted={isGoatCompleted}
      skills={skills}
      initialTaggedSkills={taggedSkills}
    />
  );
}
