import { getBoostedSkills } from "@/utils/profile/get-boosted-skills";
import GoatResultsLeftColumn from "@/components/profile/goat/GoatTaggerLeftColumn";
import GoatResultsRightColumn from "@/components/profile/goat/GoatTaggerRightColumn";
import { GoatSkillTaggerProps } from "@/types/profile";

function GoatSkillTagger({ skills, answers, onFinish }: GoatSkillTaggerProps) {
  const boostedSkills = getBoostedSkills(skills, answers);
  console.log("Boosted Skills:", boostedSkills);

  return (
    <section>
      <GoatResultsLeftColumn />
      <GoatResultsRightColumn />
      <button onClick={onFinish}>Finish Tagging</button>
    </section>
  );
}

export default GoatSkillTagger;
