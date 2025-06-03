import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

//* Helper function to get the current authenticated user.
export const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

//* Helper function to get admin user.
//* We use this if we want to be 100% sure that the user is an admin before performing any action.
export const getAdminUser = async () => {
  const user = await getAuthUser();
  if (
    user.id !== process.env.ADMIN_USER_ID?.trim() &&
    user.id !== process.env.TEST_ADMIN_USER_ID?.trim()
  ) {
    redirect("/");
  }
  return user;
};
