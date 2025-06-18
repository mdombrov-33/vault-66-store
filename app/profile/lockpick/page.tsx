import LockpickGame from '@/components/profile/lockpick/LockpickGame'
import { getLockpickSkill } from '@/utils/actions/lockpick'

async function LockpickPage() {
  const lockpickSkill = await getLockpickSkill()

  return <LockpickGame lockpickSkill={lockpickSkill} />
}

export default LockpickPage
