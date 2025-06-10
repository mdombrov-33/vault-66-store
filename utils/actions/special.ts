"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { renderError } from "@/utils/render-error";
import { validateZodSchema } from "@/utils/validation/validate-zod-schema";
import { specialSchema } from "@/utils/validation/schemas";
import { getAuthUser } from "@/utils/auth/get-user";
import { syncSkillsFromSpecial } from "./goat";

//* Creates a new SPECIAL record in the database
export const createSpecialAction = async (
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    for (const entry of formData.entries()) {
      console.log("FORM ENTRY:", entry);
    }

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

    await syncSkillsFromSpecial();

    revalidatePath("/profile/special");
    return { message: "Thanks! Nice to meet you" };
  } catch (error) {
    return renderError(error);
  }
};

//* Get SPECIAL record for the user
export const getSpecialRecord = async (clerkId: string) => {
  const specialRecord = await db.special.findUnique({
    where: {
      clerkId,
    },
  });

  return specialRecord;
};
