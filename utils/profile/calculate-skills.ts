import { Skills, SpecialStats } from "../../types/profile";

export function calculateSkills({
  strength,
  perception,
  endurance,
  charisma,
  intelligence,
  agility,
  luck,
}: SpecialStats): Skills {
  const scale = 1.5;
  const base = (stat: number) => Math.round(stat * 2 + 2 + luck / 2) * scale;
  return {
    barter: base(charisma),
    bigGuns: base(strength),
    energyWeapons: base(intelligence),
    explosives: base(perception),
    lockpick: base(intelligence),
    medicine: base(intelligence),
    meleeWeapons: base(strength),
    repair: base(intelligence),
    science: base(intelligence),
    sneak: base(agility),
    speech: base(charisma),
    smallGuns: base(perception),
    unarmed: base(strength),
    survival: base(endurance),
  };
}
