import { getSpecialRecord } from "@/utils/actions/special";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { getAuthUser } from "@/utils/auth/get-user";

async function ProfileSidebarWrapper() {
  const user = await getAuthUser();
  const specialRecord = await getSpecialRecord(user.id);

  return <ProfileSidebar specialRecord={specialRecord} />;
}

export default ProfileSidebarWrapper;
