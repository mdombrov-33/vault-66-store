import GoatPageWrapper from '@/components/profile/goat/GoatPageWrapper'
import {
  getGoatCompletionStatus,
  getInitialSkills,
  getUserFinalSkills,
  getUserTaggedSkills,
} from '@/utils/actions/goat'

async function GoatPage() {
  const [isGoatCompleted, baseSkills, finalSkills, taggedSkills] = await Promise.all([
    getGoatCompletionStatus(),
    getInitialSkills(),
    getUserFinalSkills(),
    getUserTaggedSkills(),
  ])

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
