import { Button } from '@/components/ui/button'
import { LockpickForcePanelProps } from '@/types/profile'

function LockpickForcePanel({
  forceChance,
  onForceAttempt,
  remainingPins,
  isCracked,
}: LockpickForcePanelProps) {
  const isDisabled = remainingPins === 0 || isCracked
  return (
    <div className="flex flex-col items-center justify-end">
      <div className="p-4 flex flex-col gap-2 w-full">
        {/* Force Chance */}
        <div className="flex justify-between w-full text-xl lg:text-3xl text-muted-foreground">
          <span>Force Chance</span>
          <span className="text-muted-foreground">{forceChance}%</span>
        </div>

        {/* Force Button */}
        <Button
          variant="default"
          onClick={onForceAttempt}
          className="w-full mt-4 lg:text-3xl text-xl"
          disabled={isDisabled}
        >
          Force Lock
        </Button>
      </div>
    </div>
  )
}

export default LockpickForcePanel
