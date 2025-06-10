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

  const finalSkills = Object.fromEntries(
    Object.entries(boostedSkills).map(([key, value]) => {
      const isTagged = selectedSkills[key as SkillKeys];
      return [key, isTagged ? value + 15 : value];
    })
  ) as SkillAttributes;

  return (
    <>
      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 px-4 pb-8  ">
        <FormContainer action={submitGoatSkillsAction} onSuccess={onFinish}>
          {/* Hidden inputs for final Skills after tagging */}
          {Object.entries(finalSkills).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}

          {/* Hidden inputs for tagged skills (only those selected) */}
          {Object.entries(selectedSkills).map(([key, isSelected]) =>
            isSelected ? (
              <input key={key} type="hidden" name="taggedSkills" value={key} />
            ) : null
          )}

          <div className="md:self-start">
            <GoatTaggerLeftSection
              finalSkills={finalSkills}
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
              setHoveredSkill={setHoveredSkill}
            />
          </div>
          <div className="flex items-center justify-center mt-8 ">
            <SubmitButton className="text-3xl" text="submit skills" />
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
