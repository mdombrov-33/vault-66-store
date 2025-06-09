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

  //* Original well-rounded mid-range
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

  //* Intelligence + Perception high combo
  if (intelligence >= 7 && perception >= 7) {
    return "Smart and sharp-eyed — you’re the ultimate scout and thinker.";
  }

  //* Charisma + Luck high combo
  if (charisma >= 7 && luck >= 7) {
    return "Charm and fortune favor you — a smooth talker who always catches a break.";
  }

  //* Strength + Endurance high combo
  if (strength >= 7 && endurance >= 7) {
    return "Built like a tank — strong and tough enough to take a beating.";
  }

  //* Agility + Luck high combo
  if (agility >= 7 && luck >= 7) {
    return "Quick on your feet and lucky to boot — hard to pin down and easy to get ahead.";
  }

  //* Medium charisma + low perception + low intelligence
  if (charisma >= 5 && charisma <= 7 && perception <= 3 && intelligence <= 3) {
    return "You rely on charm, but sometimes miss what’s right in front of you.";
  }

  //* High endurance, low agility and luck
  if (endurance >= 7 && agility <= 4 && luck <= 4) {
    return "Slow and steady wins the race — you can take hits, but don’t expect quick reflexes or lucky breaks.";
  }

  //* Low charisma + high perception + moderate intelligence
  if (
    charisma <= 3 &&
    perception >= 6 &&
    intelligence >= 5 &&
    intelligence <= 7
  ) {
    return "Not one for social graces, but your mind and senses keep you one step ahead.";
  }

  //* Strength + Intelligence combo — brawler with brains
  if (strength >= 6 && intelligence >= 6 && charisma <= 5) {
    return "Brains and brawn combine in you — a force to be reckoned with.";
  }

  //* Medium agility + medium luck + low endurance
  if (
    agility >= 5 &&
    agility <= 7 &&
    luck >= 5 &&
    luck <= 7 &&
    endurance <= 3
  ) {
    return "Fast and fortunate, but fragile — keep moving or get knocked down.";
  }

  //* High charisma + medium intelligence + low strength
  if (
    charisma >= 7 &&
    intelligence >= 5 &&
    intelligence <= 7 &&
    strength <= 3
  ) {
    return "You talk your way out of trouble, relying on wit and charm over muscle.";
  }

  //* Low luck + high endurance + medium strength and perception
  if (
    luck <= 3 &&
    endurance >= 7 &&
    strength >= 4 &&
    strength <= 6 &&
    perception >= 4 &&
    perception <= 6
  ) {
    return "Not lucky, but tough and alert — you survive through sheer grit.";
  }

  //* Medium stats all around except high luck
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
    luck >= 7
  ) {
    return "Balanced, but with an edge of fortune on your side.";
  }

  //* Agility + perception + intelligence high combo
  if (agility >= 7 && perception >= 7 && intelligence >= 7) {
    return "Fast, sharp, and smart — a stealthy genius in the Wastes.";
  }

  //* Low charisma + low agility + low luck
  if (charisma <= 3 && agility <= 3 && luck <= 3) {
    return "You struggle to charm, move quickly, or catch a break — but maybe there’s other strengths to lean on.";
  }

  //* Strength + endurance + luck medium-high combo
  if (strength >= 5 && endurance >= 6 && luck >= 5) {
    return "Strong, tough, and a bit lucky — you can survive the worst and come out ahead.";
  }

  //* High charisma + perception + luck combo (3 stats)
  if (charisma >= 7 && perception >= 7 && luck >= 7) {
    return "You see the world clearly, charm your way through it, and luck is always on your side.";
  }

  //* Intelligence + endurance + low charisma
  if (intelligence >= 7 && endurance >= 6 && charisma <= 3) {
    return "Brain and brawn combined, but you don’t waste time on social niceties.";
  }

  //* Agility + perception low + high strength
  if (agility <= 4 && perception <= 4 && strength >= 7) {
    return "Not very quick or observant, but you make up for it with raw power.";
  }

  //* Fallback
  return "You're an odd mix. Maybe that’s exactly what the Wasteland needs.";
};
