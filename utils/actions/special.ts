"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { renderError } from "@/utils/render-error";
import { validateZodSchema } from "@/utils/validation/validate-zod-schema";
import { specialSchema } from "@/utils/validation/schemas";
import { getAuthUser } from "@/utils/auth/get-user";
import { calculateSkills } from "../profile/calculate-skills";

//* Creates a new SPECIAL record in the database
export const createSpecialAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateZodSchema(specialSchema, rawData);

    const isAllocated = await db.special.findFirst({
      where: {
        clerkId: user.id,
        isAllocated: true,
      },
    });

    if (isAllocated) {
      throw new Error("You already allocated your SPECIAL attributes");
    }

    await db.special.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
        isAllocated: true,
      },
    });

    revalidatePath("/profile/special");
    return { message: "Thanks! Nice to meet you" };
  } catch (error) {
    return renderError(error);
  }
};

//* Get SPECIAL record for the user
export const getSpecialRecord = async () => {
  const user = await getAuthUser();

  const specialRecord = await db.special.findUnique({
    where: {
      clerkId: user?.id,
    },
  });

  return specialRecord;
};

//* Syncs the user's skills based on their SPECIAL attributes
export const syncSkillsFromSpecial = async () => {
  const user = await getAuthUser();

  try {
    const special = await getSpecialRecord();

    const skillsData = {
      ...calculateSkills(special!),
    };

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
