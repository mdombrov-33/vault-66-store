import { Button } from '@/components/ui/button'
import { ResetBtnProps } from '@/types/profile'

function ResetBtn({ resetGame, setOnWordHover }: ResetBtnProps) {
  return (
    <Button
      variant="default"
      onClick={() => {
        resetGame()
        setOnWordHover(null)
      }}
      size="sm"
      className="px-6 py-2  bg-[var(--terminal-text)] text-black rounded md:text-xl"
    >
      RETRY
    </Button>
  )
}

export default ResetBtn
