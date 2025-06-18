'use server'

import db from '@/lib/db'
import { renderError } from '@/utils/render-error'
import { getAuthUser } from '../auth/get-user'

//* Get lockpick skill record for the user
export const getLockpickSkill = async () => {
  const user = await getAuthUser()

  try {
    const skillRecord = await db.skill.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        lockpick: true,
      },
    })

    //* Default to 0 if field is missing
    return skillRecord?.lockpick ?? 0
  } catch (error) {
    renderError(error)
    return 0
  }
}
