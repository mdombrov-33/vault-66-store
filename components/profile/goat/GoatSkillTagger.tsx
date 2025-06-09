import { getBoostedSkills } from "@/utils/profile/get-boosted-skills";
import { GoatSkillTaggerProps, SkillKeys } from "@/types/profile";
import { useState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import GoatTaggerLeftColumn from "./GoatTaggerLeftSection";
import GoatSkillTaggerRightSection from "./GoatTaggerRightSection";
import GoatTaggerLeftSection from "./GoatTaggerLeftSection";

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

  const selectedCount = Object.values(selectedSkills).filter(Boolean).length;
  const totalCount = 3;

  //* ADD ACTION FOR UPDATING SKILLS + TAGGING
  return (
    <>
      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 px-4 pb-8 mt-12">
        <FormContainer>
          <div className="md:self-start">
            <GoatTaggerLeftSection
              boostedSkills={boostedSkills}
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
              setHoveredSkill={setHoveredSkill}
              selectedCount={selectedCount}
              totalCount={totalCount}
            />
          </div>
          <div className="flex items-center justify-center mt-8 md:mt-0">
            <SubmitButton text="submit skills" onClick={onFinish} />
          </div>
        </FormContainer>

        <div className="hidden md:block">
          <GoatSkillTaggerRightSection hoveredSkill={hoveredSkill} />
        </div>
      </div>
    </>
  );
}

export default GoatSkillTagger;
