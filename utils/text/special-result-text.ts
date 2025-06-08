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

  if (strength >= 8 && perception >= 8) {
    return "You’re a powerhouse who can spot threats before they even get close.";
  }

  if (endurance >= 9 && luck <= 3) {
    return "You can take a beating, but the Wasteland isn’t kind to the unlucky.";
  }

  if (charisma >= 9 && intelligence <= 3) {
    return "You might not be the brightest, but you sure know how to make friends.";
  }

  if (agility >= 9 && luck >= 9) {
    return "You’re quick and lucky—like a feral ghoul in a Nuka-Cola factory.";
  }

  if (intelligence >= 7 && charisma >= 7) {
    return "With both brains and charm, you're a smooth-talking strategist.";
  }

  if (agility >= 8 && perception >= 8) {
    return "You move like a ghost and strike before they even see you.";
  }

  if (luck >= 9 && intelligence <= 3) {
    return "You're dumb as a radroach, but somehow everything just works out.";
  }

  if (strength >= 8 && endurance >= 8) {
    return "You’re a walking tank. Subtlety isn’t your style.";
  }

  if (intelligence >= 9 && perception >= 9) {
    return "You're a master tactician with eyes like a hawk—nothing escapes your plan.";
  }

  if (strength <= 3 && intelligence >= 9) {
    return "A fragile genius—big brain, weak biceps. You’d rather outsmart than outpunch.";
  }

  if (charisma >= 9 && luck >= 9) {
    return "People love you and fate favors you. Somehow, things *always* go your way.";
  }

  if (agility <= 3 && endurance >= 9) {
    return "You're not fast, but you’re built like a Brahmin. You’ll outlast everyone.";
  }

  if (perception <= 3 && intelligence >= 8) {
    return "You're brilliant, but you might walk into a wall if it weren’t for your Pip-Boy.";
  }

  if (strength >= 7 && charisma >= 7) {
    return "You can charm or crush your way through any situation.";
  }

  if (luck >= 9 && perception <= 3) {
    return "You barely notice what's going on, but your luck saves you every time.";
  }

  if (endurance >= 8 && agility >= 8) {
    return "You're a tireless sprinter, like a radstag on jet.";
  }

  if (charisma <= 3 && intelligence >= 7) {
    return "You have the brains but not the bedside manner. Maybe let someone else do the talking.";
  }

  if (strength <= 3 && agility >= 9) {
    return "You can’t lift much, but good luck trying to catch you.";
  }

  if (luck <= 3 && charisma <= 3) {
    return "Neither charming nor lucky — you should probably stay at home.";
  }

  if (strength >= 9 && intelligence >= 9) {
    return "A rare brute-genius — you can smash *and* strategize. Dangerous combo.";
  }

  if (luck === 1 && intelligence === 1 && charisma === 1) {
    return "Let’s just say… you’re not exactly the Chosen One.";
  }

  if (strength === 1 && agility === 1 && endurance === 1) {
    return "You probably shouldn’t leave the Vault. Ever.";
  }

  return null;
};
