import { getSpecialRecord } from '@/utils/actions/special'
import SpecialPageRegisterWrapper from '../../../components/profile/special/register/SpecialPageRegisterWrapper'
import SpecialPageResults from '../../../components/profile/special/results/SpecialPageResults'
import { SpecialRecord } from '@/types/profile'
import { cache } from 'react'

export const revalidate = 60

async function SpecialPage() {
  const cachedGetSpecialRecord = cache(getSpecialRecord)
  const specialRecord: SpecialRecord | null = await cachedGetSpecialRecord()

  if (!specialRecord) {
    return <SpecialPageRegisterWrapper />
  }

  //* LOGIC if stats were allocated
  return <SpecialPageResults specialRecord={specialRecord} />
}

export default SpecialPage
