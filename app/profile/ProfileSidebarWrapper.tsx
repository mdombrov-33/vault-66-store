import { getSpecialRecord } from "@/utils/profile";
import ProfileSidebar from "../../components/profile/ProfileSidebar";

async function ProfileSidebarWrapper() {
  const specialRecord = await getSpecialRecord();

  return <ProfileSidebar specialRecord={specialRecord} />;
}

export default ProfileSidebarWrapper;
