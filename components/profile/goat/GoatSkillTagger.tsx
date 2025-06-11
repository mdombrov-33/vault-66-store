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
import { useSoundPlayer } from "@/hooks/useSoundPlayer";

function GoatSkillTagger({
  baseSkills,
  answers,
  onFinish,
}: GoatSkillTaggerProps) {
  const boostedSkills = getBoostedSkills(baseSkills, answers); //* We take base skills for SPECIAL registration + applying goat answers
  const { playClick } = useSoundPlayer();

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

  const taggedSkills = (Object.keys(selectedSkills) as SkillKeys[]).filter(
    (key) => selectedSkills[key]
  );

  const handleSubmit = () => {
    onFinish(finalSkills, taggedSkills);
  };

  return (
    <section>
      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 px-4 pb-8  ">
        <FormContainer action={submitGoatSkillsAction} onSuccess={handleSubmit}>
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
            <SubmitButton
              loadingText="Checking results..."
              className="text-3xl"
              text="submit skills"
              onClick={() => {
                playClick();
              }}
            />
          </div>
        </FormContainer>

        <div className="hidden md:block">
          <GoatSkillTaggerRightSection hoveredSkill={hoveredSkill} />
        </div>
      </div>
    </section>
  );
}

export default GoatSkillTagger;
