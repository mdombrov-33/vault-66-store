import db from "@/lib/db";
import { renderError } from "@/utils/render-error";
// import { validateZodSchema } from "@/utils/validation/validate-zod-schema";
// import { specialSchema } from "@/utils/validation/schemas";
// import { getAuthUser } from "@/utils/auth/get-user";
import { getSpecialRecord } from "./special";
import { calculateSkills } from "../profile/calculate-skills";

//* Syncs the user's skills based on their SPECIAL attributes
export const syncSkillsFromSpecial = async (clerkId: string) => {
  try {
    const special = await getSpecialRecord(clerkId);

    const skillsData = {
      ...calculateSkills(special!),
    };

    // console.log("DB Object Keys:", Object.keys(db));
    // console.log("db.skill:", db.skill);

    const result = await db.skill.upsert({
      where: {
        clerkId,
      },
      update: skillsData,
      create: {
        ...skillsData,
        clerkId,
      },
    });
    return result;
  } catch (error) {
    return renderError(error);
  }
};

//* Get Skills record for the user
export const getSkillRecord = async (clerkId: string) => {
  const skillRecord = await db.skill.findUnique({
    where: {
      clerkId,
    },
    select: {
      barter: true,
      bigGuns: true,
      energyWeapons: true,
      explosives: true,
      lockpick: true,
      medicine: true,
      meleeWeapons: true,
      repair: true,
      science: true,
      sneak: true,
      speech: true,
      survival: true,
      unarmed: true,
      smallGuns: true,
    },
  });

  //* Default to 0 if any field is missing
  return {
    barter: skillRecord?.barter ?? 0,
    bigGuns: skillRecord?.bigGuns ?? 0,
    energyWeapons: skillRecord?.energyWeapons ?? 0,
    explosives: skillRecord?.explosives ?? 0,
    lockpick: skillRecord?.lockpick ?? 0,
    medicine: skillRecord?.medicine ?? 0,
    meleeWeapons: skillRecord?.meleeWeapons ?? 0,
    repair: skillRecord?.repair ?? 0,
    science: skillRecord?.science ?? 0,
    sneak: skillRecord?.sneak ?? 0,
    speech: skillRecord?.speech ?? 0,
    survival: skillRecord?.survival ?? 0,
    unarmed: skillRecord?.unarmed ?? 0,
    smallGuns: skillRecord?.smallGuns ?? 0,
  };
};

//* Get goat status to lock in final result
export const getGoatCompletionStatus = async (
  clerkId: string
): Promise<boolean> => {
  const result = await db.skill.findUnique({
    where: { clerkId },
    select: { isGoatCompleted: true },
  });

  return result?.isGoatCompleted ?? false;
};
