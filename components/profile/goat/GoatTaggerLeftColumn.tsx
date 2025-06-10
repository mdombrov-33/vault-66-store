import { useSoundPlayer } from "@/hooks/useSoundPlayer";
import { GoatTaggerLeftColumnProps, SkillKeys } from "@/types/profile";
import { cn } from "@/utils/cn";

//* To split keys with multiple words into readable format
function camelCaseToWords(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

function GoatTaggerLeftColumn({
  finalSkills,
  boostedSkills,
  selectedSkills,
  setSelectedSkills,
  setHoveredSkill,
}: GoatTaggerLeftColumnProps) {
  const { playHover, playClick } = useSoundPlayer();

  const handleClick = (key: keyof typeof boostedSkills) => {
    const isSelected = selectedSkills[key as SkillKeys];
    if (
      !isSelected &&
      Object.values(selectedSkills).filter(Boolean).length >= 3
    ) {
      return;
    }
    setSelectedSkills((prev) => {
      return {
        ...prev,
        [key]: !isSelected,
      };
    });
    playClick();
  };

  const handleHover = (key: keyof typeof boostedSkills) => {
    setHoveredSkill(key);
    playHover();
  };

  return (
    <ul>
      {Object.entries(finalSkills).map(([key, value]) => (
        <li
          onClick={() => handleClick(key as keyof typeof boostedSkills)}
          onMouseEnter={() => {
            handleHover(key as keyof typeof boostedSkills);
          }}
          onMouseLeave={() => {
            setHoveredSkill(null);
          }}
          key={key}
          className={cn(
            "flex justify-between hover:bg-primary hover:text-black px-2",
            selectedSkills[key as SkillKeys]
              ? "bg-primary text-black"
              : undefined
          )}
        >
          <span className="text-2xl uppercase">{camelCaseToWords(key)}</span>
          <span className="text-2xl">{value}</span>
        </li>
      ))}
    </ul>
  );
}

export default GoatTaggerLeftColumn;
