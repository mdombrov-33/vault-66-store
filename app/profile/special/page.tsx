import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import SpecialPageWrapper from "./SpecialPageWrapper";

async function SpecialPage() {
  const { userId } = await auth();

  const specialRecord = await db.special.findUnique({
    where: {
      clerkId: userId as string,
    },
  });

  if (!specialRecord) {
    return <SpecialPageWrapper />;
  }

  return <p>you already registred</p>;
}

//* LOGIC FOR ALLOCATED STATS

export default SpecialPage;
