import { getSpecialRecord } from '@/utils/actions/special'
import ProfileSidebar from '@/components/profile/ProfileSidebar'
import { cache } from 'react'

async function ProfileSidebarWrapper() {
  const cachedSpecialRecord = cache(getSpecialRecord)
  const specialRecord = await cachedSpecialRecord()

  return <ProfileSidebar specialRecord={specialRecord} />
}

export default ProfileSidebarWrapper
