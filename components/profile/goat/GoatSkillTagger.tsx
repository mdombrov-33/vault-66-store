import { getBoostedSkills } from "@/utils/profile/get-boosted-skills";
import {
  GoatSkillTaggerProps,
  SkillAttributes,
  SkillKeys,
} from "@/types/profile";
import { useState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import GoatSkillTaggerRightSection from "./GoatTaggerRightSection";
import GoatTaggerLeftSection from "./GoatTaggerLeftSection";
import { submitGoatSkillsAction } from "@/utils/actions/goat";

function GoatSkillTagger({ skills, answers, onFinish }: GoatSkillTaggerProps) {
  const baseSkills: SkillAttributes = {
    barter: skills.barter,
    bigGuns: skills.bigGuns,
    energyWeapons: skills.energyWeapons,
    explosives: skills.explosives,
    lockpick: skills.lockpick,
    medicine: skills.medicine,
    meleeWeapons: skills.meleeWeapons,
    repair: skills.repair,
    science: skills.science,
    smallGuns: skills.smallGuns,
    sneak: skills.sneak,
    speech: skills.speech,
    survival: skills.survival,
    unarmed: skills.unarmed,
  };

  const boostedSkills = getBoostedSkills(baseSkills, answers);

  const [selectedSkills, setSelectedSkills] = useState<
    Record<SkillKeys, boolean>
  >(
    () =>
      Object.fromEntries(
        Object.keys(boostedSkills).map((key) => [key, false])
      ) as Record<SkillKeys, boolean>
  );

  const [hoveredSkill, setHoveredSkill] = useState<SkillKeys | null>(null);

  //* ADD ACTION FOR UPDATING SKILLS + TAGGING
  return (
    <>
      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 px-4 pb-8  ">
        <FormContainer action={submitGoatSkillsAction}>
          <div className="md:self-start">
            <GoatTaggerLeftSection
              boostedSkills={boostedSkills}
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
              setHoveredSkill={setHoveredSkill}
            />
          </div>
          <div className="flex items-center justify-center mt-8 ">
            <SubmitButton
              className="text-3xl"
              text="submit skills"
              onClick={onFinish}
            />
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
