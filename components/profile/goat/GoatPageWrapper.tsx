"use client";

import { useState } from "react";
import GoatIntro from "./GoatIntro";
import GoatTest from "./GoatTest";
import GoatSkillTagger from "./GoatSkillTagger";
import GoatFinalResults from "./GoatFinalResults";
import { GoatSkillsProps, GoatStage, SkillAttributes } from "@/types/profile";

function GoatPageWrapper({
  baseSkills,
  isGoatCompleted,
  taggedSkills,
}: GoatSkillsProps) {
  const [stage, setStage] = useState<GoatStage>(
    isGoatCompleted ? "final" : "intro"
  );
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [finalSkills, setFinalSkills] = useState<SkillAttributes>(baseSkills);
  const [finalTags, setFinalTags] = useState<string[]>(taggedSkills || []);

  //*  Lock at GOAT results screen if already completed, we set the flag after submitting the skills
  if (isGoatCompleted) {
    if (stage === "final") {
      return (
        <GoatFinalResults finalSkills={finalSkills} taggedSkills={finalTags} />
      );
    }
  }

  //*  Otherwise, proceed with test stages
  switch (stage) {
    case "intro":
      return <GoatIntro handleStart={() => setStage("test")} />;
    case "test":
      return <GoatTest setStage={setStage} setAnswers={setQuizAnswers} />;
    case "tagging":
      return (
        <GoatSkillTagger
          baseSkills={baseSkills}
          answers={quizAnswers}
          onFinish={(finalSkills, taggedSkills) => {
            setFinalSkills(finalSkills);
            setFinalTags(taggedSkills);
            setStage("final");
          }}
        />
      );
    default:
      if (stage === "final") {
        return (
          <GoatFinalResults
            finalSkills={finalSkills}
            taggedSkills={finalTags}
          />
        );
      }

      throw new Error("Unknown stage state.");
  }
}
export default GoatPageWrapper;
