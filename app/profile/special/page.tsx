import { getSpecialRecord } from '@/utils/actions/special'
import SpecialPageRegisterWrapper from '../../../components/profile/special/register/SpecialPageRegisterWrapper'
import SpecialPageResults from '../../../components/profile/special/results/SpecialPageResults'
import { SpecialRecord } from '@/types/profile'
import { getAuthUser } from '@/utils/auth/get-user'

async function SpecialPage() {
  const user = await getAuthUser()
  const specialRecord: SpecialRecord | null = await getSpecialRecord(user.id)

  if (!specialRecord) {
    return <SpecialPageRegisterWrapper />
  }

  //* LOGIC if stats were allocated
  return <SpecialPageResults specialRecord={specialRecord} />
}

export default SpecialPage
