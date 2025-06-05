//* Get special record for the user

import db from "@/utils/db";
import { currentUser } from "@clerk/nextjs/server";

//* Get SPECIAL record for the user
export const getSpecialRecord = async () => {
  const user = await currentUser();

  const specialRecord = await db.special.findUnique({
    where: {
      clerkId: user?.id,
    },
  });

  return specialRecord;
};
