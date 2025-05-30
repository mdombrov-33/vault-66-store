import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

//* Helper function to get the current authenticated user.
export const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

//* Helper function to get admin user. Extra check to restrict access to admin users only.
export const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) {
    redirect("/");
  }
  return user;
};
