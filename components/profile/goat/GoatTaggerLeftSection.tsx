import { GoatTaggerLeftSectionProps } from "@/types/profile";
import GoatTaggerSummary from "./GoatTaggerSummary";
import GoatTaggerLeftColumn from "./GoatTaggerLeftColumn";

function GoatTaggerLeftSection({
  finalSkills,
  selectedSkills,
  setSelectedSkills,
  setHoveredSkill,
}: GoatTaggerLeftSectionProps) {
  const selectedCount = Object.values(selectedSkills).filter(Boolean).length;
  const totalCount = 3;

  return (
    <div className="w-full max-w-md space-y-4">
      <GoatTaggerSummary
        selectedCount={selectedCount}
        totalCount={totalCount}
      />
      <GoatTaggerLeftColumn
        finalSkills={finalSkills}
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
        setHoveredSkill={setHoveredSkill}
      />
    </div>
  );
}

export default GoatTaggerLeftSection;
