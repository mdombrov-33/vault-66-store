import { goatSkills } from '@/data/profile/goat/goat-skills-data'
import { GoatTaggerRightSectionProps } from '@/types/profile'
import Image from 'next/image'

//* To split keys with multiple words into readable format
function camelCaseToWords(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

function GoatTaggerRightSection({ hoveredSkill }: GoatTaggerRightSectionProps) {
  const currentSkill = goatSkills.find((skill) => skill.name === hoveredSkill)

  return (
    <div className="p-4">
      {currentSkill ? (
        <div className="flex flex-col items-center">
          <div className="w-[200px] h-[200px] relative mb-2">
            <Image
              src={currentSkill.icon}
              alt={`${currentSkill.name} icon`}
              fill
              className="object-contain"
              sizes="(min-width: 768px) 150px"
              unoptimized
            />
          </div>
          <h3 className="text-7xl uppercase font-bold text-primary text-center tracking-wider">
            {camelCaseToWords(currentSkill.name)}
          </h3>
          <p className="text-muted-foreground text-xl xl:text-2xl text-center mt-2 font-[roboto-mono] ">
            {currentSkill.description}
          </p>
        </div>
      ) : (
        <p className="text-muted-foreground text-2xl text-center font-[roboto-mono]">
          Hover over a skill to see details.
        </p>
      )}
    </div>
  )
}

export default GoatTaggerRightSection
