import { goatQuestions } from '@/data/profile/goat/goat-questions'
import { SkillAttributes } from '@/types/profile'

export function getBoostedSkills(
  baseSkills: SkillAttributes | null,
  answers: Record<number, string>
): SkillAttributes {
  //* Start with a fresh skills object.
  //* Set all skills to 0 first, then copy over any base skills the user already has.
  //* This way we don’t accidentally modify the original baseSkills object.
  const boostedSkills: SkillAttributes = {
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
    ...(baseSkills || {}), //* If baseSkills is null, just skip this part.
  }

  //* Loop through each answer the user gave.
  //* answers object looks like: { 0: "A", 1: "B", 2: "D" } etc.
  for (const [questionIndexStr, answerId] of Object.entries(answers)) {
    //* The keys in answers are strings (because of Object.entries), so turn it into a number
    const questionIndex = Number(questionIndexStr)

    //* Grab the question from the full GOAT questions list
    const question = goatQuestions[questionIndex]

    //* Find the answer object that matches the player's chosen answer ID
    //* For example, answerId could be "A", so we find answer with id === "A"
    const answer = question?.answers.find((a) => a.id === String(answerId))

    //* If for some reason this answer has no skill tags, just skip it and move on
    if (!answer?.tags) continue

    //* Each tag corresponds to a skill that should get a boost, like "speech" or "barter"
    for (const tag of answer.tags) {
      //* Make sure this skill actually exists in our skills object
      if (tag in boostedSkills) {
        //* Add 8 points to that skill for every tag
        //* This simulates the user getting better at that skill thanks to their answer choice
        boostedSkills[tag as keyof SkillAttributes] += 8
      }
    }
  }

  return boostedSkills
}
