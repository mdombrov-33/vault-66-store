import { Button } from '@/components/ui/button'
import { LockpickInfoPanelProps } from '@/types/profile'

function LockpickInfoPanel({
  brokenPins,
  bobbyPins,
  isCracked,
  resetGame,
  remainingPins,
  lockpickSkill,
  lockLevel,
  totalBrokenPins,
}: LockpickInfoPanelProps) {
  return (
    <div className="flex flex-col items-center h-full">
      {(brokenPins >= bobbyPins || isCracked) && (
        <div className="mb-4">
          <Button variant="default" size="lg" className="lg:text-3xl text-xl" onClick={resetGame}>
            RETRY
          </Button>
        </div>
      )}

      <div className="border-t-2 border-l-2 border-muted-foreground p-4 flex flex-col gap-2 w-full mt-auto">
        {/* Lockpick Skill */}
        <div className="flex justify-between w-full text-xl lg:text-3xl text-muted-foreground">
          <span>Lockpick Skill</span>
          <span className="text-muted-foreground">
            {lockpickSkill >= 7 ? lockpickSkill : 'Unknown'}
          </span>
        </div>

        {/* Bobby Pins */}
        <div className="flex justify-between w-full text-xl lg:text-3xl text-muted-foreground">
          <span>Bobby Pins</span>
          <span className="text-muted-foreground">{remainingPins}</span>
        </div>

        {/* Lock Level */}
        <div className="flex justify-between w-full text-xl lg:text-3xl text-muted-foreground">
          <span>Lock Level</span>
          <span className="text-muted-foreground">{lockLevel}</span>
        </div>
      </div>
      <div className="flex mt-6 justify-between w-full text-xl lg:text-3xl text-muted-foreground">
        <span>Total Broken</span>
        <span className="text-muted-foreground">{totalBrokenPins}</span>
      </div>
    </div>
  )
}
export default LockpickInfoPanel
