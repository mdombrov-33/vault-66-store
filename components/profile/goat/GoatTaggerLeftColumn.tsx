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
  return (
    <ul>
      {Object.entries(boostedSkills).map(([key, value]) => (
        <li key={key} className="flex justify-between ">
          <span className="text-2xl uppercase text-primary">
            {camelCaseToWords(key)}
          </span>
          <span className="text-2xl text-primary">{value}</span>
        </li>
      ))}
    </ul>
  );
}

export default GoatTaggerLeftColumn;
