import { useSoundPlayer } from '@/hooks/useSoundPlayer'
import { GoatTaggerLeftColumnProps, SkillKeys } from '@/types/profile'
import { cn } from '@/utils/cn'

//* To split keys with multiple words into readable format
function camelCaseToWords(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

function GoatTaggerLeftColumn({
  finalSkills,
  selectedSkills,
  setSelectedSkills,
  setHoveredSkill,
}: GoatTaggerLeftColumnProps) {
  const { playHover, playClick } = useSoundPlayer()

  const handleClick = (key: keyof typeof finalSkills) => {
    const isSelected = selectedSkills[key as SkillKeys]
    if (!isSelected && Object.values(selectedSkills).filter(Boolean).length >= 3) {
      return
    }
    setSelectedSkills((prev) => {
      return {
        ...prev,
        [key]: !isSelected,
      }
    })
    playClick()
  }

  const handleHover = (key: keyof typeof finalSkills) => {
    setHoveredSkill(key)
    playHover()
  }

  return (
    <ul role="list">
      {Object.entries(finalSkills).map(([key, value]) => (
        <li
          tabIndex={0}
          onClick={() => handleClick(key as keyof typeof finalSkills)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleClick(key as keyof typeof finalSkills)
            }
          }}
          onMouseEnter={() => handleHover(key as keyof typeof finalSkills)}
          onMouseLeave={() => setHoveredSkill(null)}
          key={key}
          className={cn(
            'flex justify-between px-2',
            'hover:bg-primary hover:text-black',
            'focus:outline-none',
            'focus-visible:outline-none',
            'focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2',
            selectedSkills[key as SkillKeys] ? 'bg-primary text-black' : undefined
          )}
        >
          <span className="text-2xl uppercase">{camelCaseToWords(key)}</span>
          <span className="text-2xl">{value}</span>
        </li>
      ))}
    </ul>
  )
}

export default GoatTaggerLeftColumn
