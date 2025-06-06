import { SpecialPageResultsProps, SpecialStatsKeys } from "@/types/profile";
import SpecialResultInput from "./SpecialResultInput";

const specialStatsLabels: { [key in SpecialStatsKeys]: string } = {
  strength: "Strength",
  perception: "Perception",
  endurance: "Endurance",
  charisma: "Charisma",
  intelligence: "Intelligence",
  agility: "Agility",
  luck: "Luck",
};

function SpecialResultStats({ specialRecord }: SpecialPageResultsProps) {
  const keys = Object.keys(specialStatsLabels) as SpecialStatsKeys[];

  return (
    <>
      {keys.map((key) => (
        <SpecialResultInput
          key={key}
          name={key}
          label={specialStatsLabels[key]}
          value={specialRecord[key]}
        />
      ))}
    </>
  );
}

export default SpecialResultStats;
