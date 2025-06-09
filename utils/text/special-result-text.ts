import { SpecialRecord } from "@/types/profile";

//* Get the text for each SPECIAL attribute based on its value
export const getStrengthText = (value: number) => {
  if (value >= 9) return "You could punch a Deathclaw into next week.";
  if (value >= 6) return "You can carry more junk than a Brahmin pack.";
  if (value >= 3) return "You're not weak, just... delicate.";
  return "You once lost an arm-wrestling match to a radroach.";
};

export const getPerceptionText = (value: number) => {
  if (value >= 9) return "You can spot a Mirelurk from a mile away.";
  if (value >= 6) return "You notice things others miss, like a hidden stash.";
  if (value >= 3) return "You might trip over your own feet in the Wasteland.";
  return "You once mistook a Super Mutant for a friendly Brahmin.";
};

export const getEnduranceText = (value: number) => {
  if (value >= 9)
    return "You could survive a nuclear blast and still walk away.";
  if (value >= 6) return "You can take a beating and keep on going.";
  if (value >= 3)
    return "You might need a Stimpak or two to get through the day.";
  return "You once fainted at the sight of a radroach.";
};

export const getCharismaText = (value: number) => {
  if (value >= 9) return "You could charm a Deathclaw into giving you a hug.";
  if (value >= 6) return "You can talk your way out of most situations.";
  if (value >= 3) return "You might struggle to convince a Brahmin to move.";
  return "You once tried to barter with a feral ghoul and lost your lunch money.";
};

export const getIntelligenceText = (value: number) => {
  if (value >= 9) return "You could outsmart a Super Mutant any day.";
  if (value >= 6) return "You can solve puzzles faster than a Securitron.";
  if (value >= 3) return "You might need a Pipboy to help you read a map.";
  return "You once tried to fix a toaster and ended up with a face full of sparks.";
};

export const getAgilityText = (value: number) => {
  if (value >= 9) return "You could dodge a Deathclaw's swipe with ease.";
  if (value >= 6) return "You can move quickly, like a radroach in the dark.";
  if (value >= 3) return "You might trip over your own feet in a firefight.";
  return "You once tried to jump over a puddle and ended up in it.";
};

export const getLuckText = (value: number) => {
  if (value >= 9)
    return "You could find a Nuka-Cola Quantum in a pile of junk.";
  if (value >= 6)
    return "You have a knack for finding useful items in the Wasteland.";
  if (value >= 3)
    return "You might find a bottlecap or two, but not much else.";
  return "You once found a three-legged Brahmin and thought it was lucky.";
};

//* Get the combined text based on SPECIAL attributes
export const getCombinedSpecialText = (special: SpecialRecord) => {
  const {
    strength,
    perception,
    endurance,
    charisma,
    intelligence,
    agility,
    luck,
  } = special;

  if (
    strength >= 3 &&
    strength <= 6 &&
    perception >= 3 &&
    perception <= 6 &&
    endurance >= 3 &&
    endurance <= 6 &&
    charisma >= 3 &&
    charisma <= 6 &&
    intelligence >= 3 &&
    intelligence <= 6 &&
    agility >= 3 &&
    agility <= 6 &&
    luck >= 3 &&
    luck <= 6
  ) {
    return "A well-rounded person — maybe not exceptional, but definitely adaptable.";
  }

  if (intelligence >= 7 && strength <= 4 && charisma <= 4) {
    return "Brains over brawn — and charm. You think your way through the Wastes.";
  }

  if (strength >= 7 && intelligence <= 3) {
    return "You solve problems the old-fashioned way: by punching them.";
  }

  if (
    [
      strength,
      perception,
      endurance,
      charisma,
      intelligence,
      agility,
      luck,
    ].filter((stat) => stat >= 4 && stat <= 6).length >= 6
  ) {
    return "Not too hot, not too cold — you’re right in the survivable sweet spot.";
  }

  if (luck >= 8) {
    return "Luck is on your side. When everything goes wrong, you somehow come out on top.";
  }

  if (agility >= 6 && intelligence >= 6 && endurance <= 3) {
    return "You think fast and move faster — just hope you don’t get hit.";
  }

  return "You're an odd mix. Maybe that’s exactly what the Wasteland needs.";
};
