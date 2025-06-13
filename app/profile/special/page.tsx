import { getSpecialRecord } from '@/utils/actions/special'
import SpecialPageRegisterWrapper from '../../../components/profile/special/register/SpecialPageRegisterWrapper'
import SpecialPageResults from '../../../components/profile/special/results/SpecialPageResults'
import { SpecialRecord } from '@/types/profile'

async function SpecialPage() {
  const specialRecord: SpecialRecord | null = await getSpecialRecord()

  if (!specialRecord) {
    return <SpecialPageRegisterWrapper />
  }

  //* LOGIC if stats were allocated
  return <SpecialPageResults specialRecord={specialRecord} />
}

export default SpecialPage
