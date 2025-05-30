import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

//* Helper function to get the current authenticated user.
export const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};
