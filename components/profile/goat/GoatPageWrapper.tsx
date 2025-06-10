"use client";

import { useState } from "react";
import GoatIntro from "./GoatIntro";
import GoatTest from "./GoatTest";
import GoatSkillTagger from "./GoatSkillTagger";
import GoatFinalResults from "./GoatFinalResults";
import { GoatSkillsProps, GoatStage, SkillKeys } from "@/types/profile";

function GoatPageWrapper({
  skills,
  isGoatCompleted,
  initialTaggedSkills,
}: GoatSkillsProps) {
  const [stage, setStage] = useState<GoatStage>("intro");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [finalSkills, setFinalSkills] = useState<Record<SkillKeys, number>>(
    {} as Record<SkillKeys, number>
  );
  const [taggedSkills, setTaggedSkills] =
    useState<string[]>(initialTaggedSkills);

  //*  Lock at GOAT results screen if already completed, we set the flag after submitting the skills
  if (isGoatCompleted) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { isGoatCompleted: _, ...final } = skills;
    return (
      <GoatFinalResults
        finalSkills={final as Record<SkillKeys, number>}
        taggedSkills={taggedSkills}
      />
    );
  }

  //*  Otherwise, proceed with test stages
  switch (stage) {
    case "intro":
      return <GoatIntro handleStart={() => setStage("test")} />;
    case "test":
      return <GoatTest setStage={setStage} setAnswers={setAnswers} />;
    case "tagging":
      return (
        <GoatSkillTagger
          skills={skills}
          answers={answers}
          onFinish={(finalSkills, taggedSkills) => {
            setFinalSkills(finalSkills);
            setTaggedSkills(taggedSkills);
            setStage("final");
          }}
        />
      );
    case "final":
      return (
        <div className="pb-8 lg:pb-0">
          <GoatFinalResults
            finalSkills={finalSkills}
            taggedSkills={taggedSkills}
          />
        </div>
      );
    default:
      const _exhaustiveCheck: never = stage;
      return _exhaustiveCheck;
  }
}

export default GoatPageWrapper;
