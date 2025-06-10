export const getVaultOccupation = (
  skills: Record<string, number>,
  tagged: string[]
) => {
  const topSkills = Object.entries(skills)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([skill]) => skill);

  const has = (s: string) => topSkills.includes(s) || tagged.includes(s);

  if (has("smallGuns") && has("meleeWeapons") && has("sneak"))
    return "Vault Security Officer – You're strong, precise, and ready for action. The safety of Vault 66 lies in your steady hands.";

  if (has("science") && has("repair") && has("energyWeapons"))
    return "Robotics Technician – Your knowledge of circuits and plasma puts you in charge of maintaining our finest machines.";

  if (has("medicine") && has("science") && has("repair"))
    return "Medical Technician – When things go wrong, you're the one we trust to patch us up or power the life support systems.";

  if (has("speech") && has("barter") && has("sneak"))
    return "Supply Officer – Your charm and resourcefulness keep the Vault running smoothly, even when resources are tight.";

  if (has("explosives") && has("lockpick") && has("sneak"))
    return "Recon Specialist – For tasks best done unnoticed (or with a bang), you're the one we send.";

  if (has("bigGuns") && has("explosives") && has("meleeWeapons"))
    return "Heavy Ordinance Handler – You don’t just carry the big guns — you *are* the big gun.";

  if (has("survival") && has("medicine") && has("repair"))
    return "Field Medic – Equally handy with a wrench and a stimpack, you're vital to Vault expeditions beyond the door.";

  return "General Technician – A jack-of-all-trades, your varied skillset makes you adaptable for anything Vault 66 throws your way.";
};
