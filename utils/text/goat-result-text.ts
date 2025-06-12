export const getVaultOccupation = (
  skills: Record<string, number>,
  tagged: string[]
) => {
  const topSkills = Object.entries(skills)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([skill]) => skill);

  const has = (s: string) => topSkills.includes(s) || tagged.includes(s);

  const hasAtLeast = (arr: string[], count: number) =>
    arr.filter(has).length >= count;

  //* FULL MATCHES (3+ skills)
  if (hasAtLeast(["smallGuns", "meleeWeapons", "sneak"], 3))
    return "Vault Security Officer – You're strong, precise, and ready for action. The safety of Vault 66 lies in your steady hands.";

  if (hasAtLeast(["science", "repair", "energyWeapons"], 3))
    return "Robotics Technician – Your knowledge of circuits and plasma puts you in charge of maintaining our finest machines.";

  if (hasAtLeast(["medicine", "science", "repair"], 3))
    return "Medical Technician – When things go wrong, you're the one we trust to patch us up or power the life support systems.";

  if (hasAtLeast(["speech", "barter", "sneak"], 3))
    return "Supply Officer – Your charm and resourcefulness keep the Vault running smoothly, even when resources are tight.";

  if (hasAtLeast(["explosives", "lockpick", "sneak"], 3))
    return "Recon Specialist – For tasks best done unnoticed (or with a bang), you're the one we send.";

  if (hasAtLeast(["bigGuns", "explosives", "meleeWeapons"], 3))
    return "Heavy Ordinance Handler – You don’t just carry the big guns — you *are* the big gun.";

  if (hasAtLeast(["survival", "medicine", "repair"], 3))
    return "Field Medic – Equally handy with a wrench and a stimpack, you're vital to Vault expeditions beyond the door.";

  //* PARTIAL MATCHES (2 out of 3)
  if (hasAtLeast(["science", "repair", "energyWeapons"], 2))
    return "Engineering Assistant – You're on your way to mastering the inner workings of Vault tech.";

  if (hasAtLeast(["speech", "barter", "sneak"], 2))
    return "Communications Liaison – You know how to talk, trade, or sneak your way to success.";

  if (hasAtLeast(["medicine", "science", "repair"], 2))
    return "Medical Aide – You’ve got the basics down. With some training, you’ll save lives in no time.";

  if (hasAtLeast(["meleeWeapons", "smallGuns", "sneak"], 2))
    return "Security Trainee – You're on track to join the front lines of Vault defense.";

  if (hasAtLeast(["survival", "medicine", "meleeWeapons"], 2))
    return "Wasteland Scout – You’ve got the guts and know-how to brave the unknown when needed.";

  //* DEFAULT
  return "General Technician – A jack-of-all-trades, your varied skillset makes you adaptable for anything Vault 66 throws your way.";
};
