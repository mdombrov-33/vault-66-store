"use client";

import { useState } from "react";
import GoatIntro from "./GoatIntro";
import GoatTest from "./GoatTest";
import GoatSkillTagger from "./GoatSkillTagger";
import GoatFinalResults from "./GoatFinalResults";
import { GoatSkillsProps, GoatStage } from "@/types/profile";

export default function GoatFlowWrapper({ skills }: GoatSkillsProps) {
  const [stage, setStage] = useState<GoatStage>("intro");
  const [answers, setAnswers] = useState<Record<number, string>>({});

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
