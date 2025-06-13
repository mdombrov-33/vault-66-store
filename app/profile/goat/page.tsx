import GoatPageWrapper from '@/components/profile/goat/GoatPageWrapper'
import {
  getGoatCompletionStatus,
  getInitialSkills,
  getUserFinalSkills,
  getUserTaggedSkills,
} from '@/utils/actions/goat'
import { getSpecialRecord } from '@/utils/actions/special'
import { redirect } from 'next/navigation'
import { cache } from 'react'

export const revalidate = 60

async function GoatPage() {
  const cachedGetGoatCompletionStatus = cache(getGoatCompletionStatus)
  const cachedGetInitialSkills = cache(getInitialSkills)
  const cachedGetUserFinalSkills = cache(getUserFinalSkills)
  const cachedGetUserTaggedSkills = cache(getUserTaggedSkills)

  const [isGoatCompleted, baseSkills, finalSkills, taggedSkills, specialRecord] = await Promise.all(
    [
      cachedGetGoatCompletionStatus(),
      cachedGetInitialSkills(),
      cachedGetUserFinalSkills(),
      cachedGetUserTaggedSkills(),
      getSpecialRecord(),
    ]
  )

  if (!specialRecord) {
    redirect('/profile/special')
  }

  if (isGoatCompleted) {
    if (!finalSkills) {
      throw new Error('GOAT marked as completed but no final skills found.')
    }

    return (
      <GoatPageWrapper
        isGoatCompleted={isGoatCompleted}
        baseSkills={finalSkills}
        taggedSkills={taggedSkills}
      />
    )
  } else {
    return <GoatPageWrapper isGoatCompleted={false} baseSkills={baseSkills} />
  }
}

export default GoatPage
