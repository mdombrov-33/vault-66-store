import db from "@/lib/db";
import { renderError } from "@/utils/render-error";
import { validateZodSchema } from "@/utils/validation/validate-zod-schema";
import { specialSchema } from "@/utils/validation/schemas";
import { getAuthUser } from "@/utils/auth/get-user";
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
      isGoatCompleted: true,
    },
  });

  return skillRecord;
};
