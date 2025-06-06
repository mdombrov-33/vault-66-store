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
//* Test admin can't delete/edit products, but can view them.
export const getAuthorizedAdminUser = async () => {
  const user = await currentUser();
  const adminId = process.env.ADMIN_USER_ID?.trim();
  const testAdminId = process.env.TEST_ADMIN_USER_ID?.trim();

  if (!user || (user.id !== adminId && user.id !== testAdminId)) {
    redirect("/");
  }

  return user;
};
