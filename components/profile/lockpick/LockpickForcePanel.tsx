import { Button } from '@/components/ui/button'
import { LockpickForcePanelProps } from '@/types/profile'

function LockpickForcePanel({ forceChance }: LockpickForcePanelProps) {
  return (
    <div className="flex flex-col items-center justify-end">
      <div className="p-4 flex flex-col gap-2 w-full">
        {/* Force Chance */}
        <div className="flex justify-between w-full text-xl lg:text-3xl text-muted-foreground">
          <span>Force Chance</span>
          <span className="text-muted-foreground">{forceChance}%</span>
        </div>

        {/* Force Button */}
        <Button variant="default" className="w-full mt-4 lg:text-3xl text-xl">
          Force Lock
        </Button>
      </div>
    </div>
  )
}

export default LockpickForcePanel
