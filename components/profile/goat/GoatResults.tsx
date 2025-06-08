import { GoatResultProps } from "@/types/profile";
import { getBoostedSkills } from "@/utils/profile/get-boosted-skills";

function GoatResults({ skills, answers }: GoatResultProps) {
  const boostedSkills = getBoostedSkills(skills, answers);
  console.log("Boosted Skills:", boostedSkills);
  console.log("skills:", skills);
  return <div>GoatResults</div>;
}

export default GoatResults;
