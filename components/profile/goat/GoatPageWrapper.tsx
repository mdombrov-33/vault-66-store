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

  //*  Lock GOAT screen if already completed, add db query later to set true when submitting at tagging section
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
          onFinish={() => setStage("final")}
        />
      );
    case "final":
      return <GoatFinalResults />;
    default:
      const _exhaustiveCheck: never = stage;
      return _exhaustiveCheck;
  }
}

export default GoatPageWrapper;
