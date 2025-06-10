"use client";

import { useState } from "react";
import GoatIntro from "./GoatIntro";
import GoatTest from "./GoatTest";
import GoatSkillTagger from "./GoatSkillTagger";
import GoatFinalResults from "./GoatFinalResults";
import { GoatSkillsProps, GoatStage } from "@/types/profile";

function GoatPageWrapper({ skills, isGoatCompleted }: GoatSkillsProps) {
  const [stage, setStage] = useState<GoatStage>("intro");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [finalSkills, setFinalSkills] = useState<Record<string, number> | null>(
    null
  );
  const [taggedSkills, setTaggedSkills] = useState<string[]>([]);

  //*  Lock at GOAT results screen if already completed, we set the flag after submitting the skills
  // if (isGoatCompleted) {
  //   return <GoatFinalResults />;
  // }

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
        <GoatFinalResults
          finalSkills={finalSkills}
          taggedSkills={taggedSkills}
        />
      );
    default:
      const _exhaustiveCheck: never = stage;
      return _exhaustiveCheck;
  }
}

export default GoatPageWrapper;
