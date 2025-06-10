import { useSoundPlayer } from "@/hooks/useSoundPlayer";
import { GoatTaggerLeftColumnProps } from "@/types/profile";

//* To split keys with multiple words into readable format
function camelCaseToWords(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

function GoatTaggerLeftColumn({
  boostedSkills,
  selectedSkills,
  setSelectedSkills,
  setHoveredSkill,
}: GoatTaggerLeftColumnProps) {
  const { playHover } = useSoundPlayer();

  return (
    <ul>
      {Object.entries(boostedSkills).map(([key, value]) => (
        <li
          onMouseEnter={() => {
            setHoveredSkill(key as keyof typeof boostedSkills);
            playHover();
          }}
          onMouseLeave={() => {
            setHoveredSkill(null);
          }}
          key={key}
          className="flex justify-between hover:bg-primary hover:text-black px-2"
        >
          <span className="text-2xl uppercase">{camelCaseToWords(key)}</span>
          <span className="text-2xl">{value}</span>
        </li>
      ))}
    </ul>
  );
}

export default GoatTaggerLeftColumn;
