import { getBoostedSkills } from "@/utils/profile/get-boosted-skills";
import GoatTaggerLeftColumn from "@/components/profile/goat/GoatTaggerLeftColumn";
import GoatTaggerRightColumn from "@/components/profile/goat/GoatTaggerRightColumn";
import { GoatSkillTaggerProps, SkillKeys } from "@/types/profile";
import { useState } from "react";

function GoatSkillTagger({ skills, answers, onFinish }: GoatSkillTaggerProps) {
  const boostedSkills = getBoostedSkills(skills, answers);

  const [selectedSkills, setSelectedSkills] = useState<
    Record<SkillKeys, boolean>
  >(
    () =>
      Object.fromEntries(
        Object.keys(boostedSkills).map((key) => [key, false])
      ) as Record<SkillKeys, boolean>
  );

  const [hoveredSkill, setHoveredSkill] = useState<SkillKeys | null>(null);

  return (
    <section>
      <GoatTaggerLeftColumn />
      <GoatTaggerRightColumn />
      <button onClick={onFinish}>Finish Tagging</button>
    </section>
  );
}

export default GoatSkillTagger;
