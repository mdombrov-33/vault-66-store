"use client";

import { useState } from "react";
import GoatIntro from "./GoatIntro";
import GoatTest from "./GoatTest";
import GoatSkillTagger from "./GoatSkillTagger";
import GoatFinalResults from "./GoatFinalResults";
import VaultBoySuccessScreen from "./VaultBoySuccess";
import { GoatSkillsProps, GoatStage, SkillAttributes } from "@/types/profile";
import { AnimatePresence, motion } from "framer-motion";
import { useSoundPlayer } from "@/hooks/useSoundPlayer";

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
  const { playGoatSuccess } = useSoundPlayer();

  if (isGoatCompleted && stage === "final") {
    return (
      <GoatFinalResults finalSkills={finalSkills} taggedSkills={finalTags} />
    );
  }

  if (stage === "intro") {
    return <GoatIntro handleStart={() => setStage("test")} />;
  }

  if (stage === "test") {
    return <GoatTest setStage={setStage} setAnswers={setQuizAnswers} />;
  }

  if (stage === "tagging") {
    return (
      <GoatSkillTagger
        baseSkills={baseSkills}
        answers={quizAnswers}
        onFinish={(finalSkills, taggedSkills) => {
          setFinalSkills(finalSkills);
          setFinalTags(taggedSkills);
          setStage("success");
          playGoatSuccess();

          //* wait 2 seconds, then show final result with animation
          setTimeout(() => {
            setStage("final");
          }, 2000);
        }}
      />
    );
  }

  return (
    <AnimatePresence mode="wait">
      {stage === "success" && (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <VaultBoySuccessScreen />
        </motion.div>
      )}

      {stage === "final" && (
        <motion.div
          key="final"
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 10,
            mass: 1,
            bounce: 0.3,
          }}
        >
          <GoatFinalResults
            finalSkills={finalSkills}
            taggedSkills={finalTags}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default GoatPageWrapper;
