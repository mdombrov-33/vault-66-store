"use server";

import db from "@/lib/db";
import { renderError } from "@/utils/render-error";
import { validateZodSchema } from "@/utils/validation/validate-zod-schema";
import { skillSchema } from "@/utils/validation/schemas";
import { getAuthUser } from "@/utils/auth/get-user";
import { getSpecialRecord } from "./special";
import { calculateSkills } from "../profile/calculate-skills";

//* Syncs the user's skills based on their SPECIAL attributes
export const syncSkillsFromSpecial = async () => {
  const user = await getAuthUser();

  try {
    const special = await getSpecialRecord(user.id);

    const skillsData = {
      ...calculateSkills(special!),
    };

    // console.log("DB Object Keys:", Object.keys(db));
    // console.log("db.skill:", db.skill);

    const result = await db.skill.upsert({
      where: {
        clerkId: user.id,
      },
      update: skillsData,
      create: {
        ...skillsData,
        clerkId: user.id,
      },
    });
    return result;
  } catch (error) {
    return renderError(error);
  }
};

//* Get Skills record for the user
export const getSkillRecord = async () => {
  const user = await getAuthUser();

  try {
    const skillRecord = await db.skill.findUnique({
      where: {
        clerkId: user.id,
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
  } catch (error) {
    renderError(error);
    return {
      barter: 0,
      bigGuns: 0,
      energyWeapons: 0,
      explosives: 0,
      lockpick: 0,
      medicine: 0,
      meleeWeapons: 0,
      repair: 0,
      science: 0,
      sneak: 0,
      speech: 0,
      survival: 0,
      unarmed: 0,
      smallGuns: 0,
    };
  }
};

//* Get goat status to lock in final result
export const getGoatCompletionStatus = async (): Promise<boolean> => {
  const user = await getAuthUser();

  const result = await db.skill.findUnique({
    where: {
      clerkId: user.id,
    },
    select: { isGoatCompleted: true },
  });

  return result?.isGoatCompleted ?? false;
};

//* Submits the GOAT skills form and updates the user's skills
export async function submitGoatSkillsAction(
  prevState: any,
  formData: FormData
) {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(
      Array.from(formData.entries()).filter(
        ([key]) => !key.startsWith("taggedSkills")
      )
    );

    const validatedSkills = validateZodSchema(skillSchema, rawData);

    const taggedSkills = formData.getAll("taggedSkills") as string[];

    await db.skill.upsert({
      where: {
        clerkId: user.id,
      },
      update: {
        ...validatedSkills,
        isGoatCompleted: true,
      },
      create: {
        ...validatedSkills,
        isGoatCompleted: true,
        clerkId: user.id,
      },
    });

    await db.skillTag.deleteMany({
      where: {
        clerkId: user.id,
      },
    });

    await db.skillTag.createMany({
      data: taggedSkills.map((skill) => ({
        clerkId: user.id,
        skill,
      })),
    });
    return { message: "You passed the test! Congratulations!" };
  } catch (error) {
    return renderError(error);
  }
}
