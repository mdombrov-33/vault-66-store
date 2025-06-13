import GoatPageWrapper from '@/components/profile/goat/GoatPageWrapper'
import {
  getGoatCompletionStatus,
  getInitialSkills,
  getUserFinalSkills,
  getUserTaggedSkills,
} from '@/utils/actions/goat'
import { getSpecialRecord } from '@/utils/actions/special'
import { redirect } from 'next/navigation'

async function GoatPage() {
  const [isGoatCompleted, baseSkills, finalSkills, taggedSkills, specialRecord] = await Promise.all(
    [
      getGoatCompletionStatus(),
      getInitialSkills(),
      getUserFinalSkills(),
      getUserTaggedSkills(),
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
