"use client";

import { useState } from "react";
import GoatIntro from "./GoatIntro";
import GoatTest from "./GoatTest";
import GoatSkillTagger from "./GoatSkillTagger";
import GoatFinalResults from "./GoatFinalResults";
import {
  GoatSkillsProps,
  GoatStage,
  SkillAttributes,
  SkillKeys,
} from "@/types/profile";

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
  const [finalTags, setFinalTags] = useState<string[]>(taggedSkills);

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
