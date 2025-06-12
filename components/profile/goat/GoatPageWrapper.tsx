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

          //* Wait 3 seconds, then show final result
          setTimeout(() => {
            setStage("final");
          }, 3000);
        }}
      />
    );
  }

  if (stage === "success") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
        >
          <VaultBoySuccessScreen />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (stage === "final") {
    return (
      <motion.div
        key="final"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        <GoatFinalResults finalSkills={finalSkills} taggedSkills={finalTags} />
      </motion.div>
    );
  }

  return null;
}

export default GoatPageWrapper;
