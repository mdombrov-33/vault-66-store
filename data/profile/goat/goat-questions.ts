import { GoatQuestion } from "@/types/profile";

export const goatQuestions: GoatQuestion[] = [
  {
    id: 1,
    question:
      "You are approached by a frenzied Vault scientist, who yells, \"I'm going to put my quantum harmonizer in your photonic resonation chamber!\" What's your response?",
    image: "/images/goat/question1.png",
    answers: [
      {
        id: "A",
        text: "But doctor, wouldn't that cause a parabolic destabilization of the fission singularity?",
        tags: ["science"],
      },
      {
        id: "B",
        text: "Yeah? Up yours too, buddy!",
        tags: ["speech"],
      },
      {
        id: "C",
        text: "Say nothing, grab a nearby pipe and hit the scientist in the head to knock him out. For all you knew, he was planning to blow up the vault.",
        tags: ["strength", "meleeWeapons", "unarmed", "explosives"],
      },
      {
        id: "D",
        text: "Say nothing, but slip away before the scientist can continue his rant.",
        tags: ["sneak", "agility"],
      },
    ],
  },
  {
    id: 2,
    question:
      "You discover a young boy lost in the lower levels of the Vault. He's hungry and frightened, but also appears to be in possession of stolen property. What do you do?",
    image: "/images/goat/question2.png",
    answers: [
      {
        id: "A",
        text: "Give the boy a hug and tell him everything will be okay",
        tags: ["speech"],
      },
      {
        id: "B",
        text: "Confiscate the property by force, and leave him there as punishment",
        tags: ["unarmed"],
      },
      {
        id: "C",
        text: "Pick the boy's pocket to take the stolen property for yourself, and leave the boy to his fate",
        tags: ["sneak", "lockpick"],
      },
      {
        id: "D",
        text: "Lead the boy to safety, then turn him over to the overseer",
        tags: [],
      },
    ],
  },
  {
    id: 3,
    question:
      "Your grandmother invites you to tea, but you're surprised when she gives you a pistol and orders you to kill another Vault resident. What do you do?",
    image: "/images/goat/question3.png",
    answers: [
      {
        id: "A",
        text: "Obey your elder and kill the Vault resident with the pistol.",
        tags: ["smallGuns", "bigGuns", "energyWeapons"],
      },
      {
        id: "B",
        text: "Offer your most prized possession for the resident's life.",
        tags: ["barter", "speech"],
      },
      {
        id: "C",
        text: "Ask granny for a minigun instead. After all, you don't want to miss.",
        tags: ["bigGuns", "smallGuns"],
      },
      {
        id: "D",
        text: "Throw your tea in granny's face.",
        tags: ["unarmed", "explosives"],
      },
    ],
  },
  {
    id: 4,
    question:
      "While working as an intern in the Clinic, a patient with a strange infection on his foot stumbles through the door. The infection is spreading at an alarming rate, but the doctor has stepped out for a while. What do you do?",
    image: "/images/goat/question4.png",
    answers: [
      {
        id: "A",
        text: "Amputate the foot before the infection spreads.",
        tags: ["medicine", "science", "meleeWeapons"],
      },
      {
        id: "B",
        text: "Scream for help",
        tags: ["speech"],
      },
      {
        id: "C",
        text: "Medicate the infected area to the best of your abilities.",
        tags: ["medicine", "science"],
      },
      {
        id: "D",
        text: "Restrain the patient, and merely observe as the infection spreads - Science",
        tags: ["science", "repair", "survival"],
      },
    ],
  },
  {
    id: 5,
    question:
      "Congratulations! You made one of the Vault 101 baseball teams! Which position do you prefer?",
    image: "/images/goat/question5.png",
    answers: [
      { id: "A", text: "Pitcher", tags: ["explosives"] },
      { id: "B", text: "Catcher", tags: ["bigGuns"] },
      { id: "C", text: "Designated Hitter", tags: ["meleeWeapons"] },
      {
        id: "D",
        text: "None, you wish the vault had a soccer team",
        tags: ["unarmed"],
      },
    ],
  },
  {
    id: 6,
    question:
      "Old Mr. Abernathy has locked himself in his quarters again, and you've been ordered to get him out. How do you proceed?",
    image: "/images/goat/question6.png",
    answers: [
      {
        id: "A",
        text: "Use a bobby pin to pick the lock on the door.",
        tags: ["lockpick"],
      },
      {
        id: "B",
        text: "Trade a Vault hoodlum for his cherry bomb and blow open the lock. ",
        tags: ["barter", "explosives"],
      },
      {
        id: "C",
        text: "Go to the armory, retrieve a laser pistol, and blow the lock off.",
        tags: ["energyWeapons", "bigGuns", "smallGuns"],
      },
      {
        id: "D",
        text: "Walk away, and let the old coot rot.",
        tags: ["sneak", "survival"],
      },
    ],
  },
];
