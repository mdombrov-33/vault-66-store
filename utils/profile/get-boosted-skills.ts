import { goatQuestions } from "@/data/profile/goat/goat-questions";
import { Skills } from "@/types/profile";

export function getBoostedSkills(
  baseSkills: Skills | null,
  answers: Record<number, string>
): Skills {
  const boostedSkills: Skills = {
    barter: 0,
    speech: 0,
    science: 0,
    repair: 0,
    medicine: 0,
    sneak: 0,
    explosives: 0,
    lockpick: 0,
    bigGuns: 0,
    smallGuns: 0,
    energyWeapons: 0,
    unarmed: 0,
    meleeWeapons: 0,
    survival: 0,
    ...(baseSkills || {}),
  };

  for (const [questionIndexStr, answerId] of Object.entries(answers)) {
    const questionIndex = Number(questionIndexStr);
    const question = goatQuestions[questionIndex];
    const answer = question?.answers.find((a) => a.id === String(answerId));

    if (!answer?.tags) continue;

    for (const tag of answer.tags) {
      if (tag in boostedSkills) {
        boostedSkills[tag as keyof Skills] += 8;
      }
    }
  }

  return boostedSkills;
}
