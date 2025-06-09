import { GoatTaggerLeftColumnProps } from "@/types/profile";

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
          <span className="text-2xl uppercase text-primary">{key}</span>
          <span className="text-2xl text-primary">{value}</span>
        </li>
      ))}
    </ul>
  );
}

export default GoatTaggerLeftColumn;
