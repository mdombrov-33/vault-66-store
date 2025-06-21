import { useEffect, useState } from 'react'
import { SpecialRegisterHeaderProps } from '@/types/profile'
import { TypeAnimation } from 'react-type-animation'
import { useSoundPlayer } from '@/hooks/useSoundPlayer'

function SpecialRegisterHeader({ remainingPoints }: SpecialRegisterHeaderProps) {
  const { playTypingLoop, stopTypingLoop } = useSoundPlayer()
  const [animationStage, setAnimationStage] = useState<'none' | 'first' | 'second' | 'done'>('none')

  const finalText =
    "Everyone in the wasteland plays a part. Allocate your S.P.E.C.I.A.L. stats to unlock the G.O.A.T. Test and secure your role in Vault 66's trade network."

  useEffect(() => {
    if (animationStage === 'first' || animationStage === 'second') {
      playTypingLoop()
    } else {
      stopTypingLoop()
    }

    return () => stopTypingLoop()
  }, [animationStage, playTypingLoop, stopTypingLoop])

  return (
    <div
      className="flex flex-col items-center text-center gap-2 px-4"
      role="region"
      aria-labelledby="remaining-points-label points-available-label"
    >
      <TypeAnimation
        key="welcome-animation"
        sequence={[
          () => setAnimationStage('first'),
          'welcome to your S.P.E.C.I.A.L. profile',
          () => setAnimationStage('second'),
        ]}
        wrapper="h1"
        speed={80}
        repeat={0}
        className="md:text-6xl text-3xl -mt-6 capitalize"
        cursor={false}
      />

      {animationStage === 'second' && (
        <TypeAnimation
          key="desc-animation"
          sequence={[() => setAnimationStage('second'), finalText, () => setAnimationStage('done')]}
          wrapper="p"
          speed={80}
          repeat={0}
          className="text-base text-muted-foreground sm:text-lg md:text-xl lg:text-lg max-w-xl mt-2 font-[roboto-mono]"
          cursor={false}
        />
      )}

      {/* Static replacement after typing is done */}
      {animationStage === 'done' && (
        <p className="text-base text-muted-foreground sm:text-lg md:text-xl lg:text-lg max-w-xl mt-2 font-[roboto-mono]">
          {finalText}
        </p>
      )}

      <p className="text-8xl" id="remaining-points-label">
        {remainingPoints}
      </p>

      <p className="text-2xl uppercase text-muted-foreground " id="points-available-label">
        points remaining
      </p>
    </div>
  )
}

export default SpecialRegisterHeader
