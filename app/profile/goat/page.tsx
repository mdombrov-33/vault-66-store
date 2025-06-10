import GoatPageWrapper from "@/components/profile/goat/GoatPageWrapper";
import {
  getGoatCompletionStatus,
  getInitialSkills,
  getUserFinalSkills,
  getUserTaggedSkills,
} from "@/utils/actions/goat";

export default async function GoatPage() {
  const isGoatCompleted = await getGoatCompletionStatus();

  if (isGoatCompleted) {
    const finalSkills = await getUserFinalSkills();
    const taggedSkills = await getUserTaggedSkills();

    if (!finalSkills) {
      throw new Error("GOAT marked as completed but no final skills found.");
    }

    return (
      <GoatPageWrapper
        isGoatCompleted={isGoatCompleted}
        baseSkills={finalSkills}
        taggedSkills={taggedSkills}
      />
    );
  } else {
    const baseSkills = await getInitialSkills();
    return <GoatPageWrapper isGoatCompleted={false} baseSkills={baseSkills} />;
  }
}
