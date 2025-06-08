import { specialSchema } from "@/utils/validation/schemas";
import React from "react";
import { z } from "zod";

//* SPECIAL
export type SpecialRecord = {
  id: string;
  strength: number;
  endurance: number;
  clerkId: string;
  perception: number;
  charisma: number;
  intelligence: number;
  agility: number;
  luck: number;
  isAllocated?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface SpecialPageResultsProps {
  specialRecord: SpecialRecord;
}

export interface SpecialResultInputProps {
  name: string;
  value: number;
  label: string;
}

export type SpecialStats = z.infer<typeof specialSchema>;
export type SpecialStatsKeys = keyof SpecialStats;

export interface SpecialRegisterRightColumnProps {
  hoveredStat: SpecialStatsKeys | null;
}

export interface SpecialRegisterLeftColumnProps
  extends SpecialRegisterRightColumnProps {
  onHoverChange: (stat: SpecialStatsKeys | null) => void;
  setSpecialStats: React.Dispatch<React.SetStateAction<SpecialStats>>;
  specialStats: SpecialStats;
  remainingPoints: number;
}

export interface SpecialRegisterHeaderProps {
  remainingPoints: number;
}

export interface FormSpecialRegisterInput {
  name: SpecialStatsKeys;
  label: string;
  min?: number;
  max?: number;
  value: number;
  onIncrement: (name: SpecialStatsKeys) => void;
  onDecrement: (name: SpecialStatsKeys) => void;
  onHoverChange: (stat: SpecialStatsKeys | null) => void;
  hoveredStat?: SpecialStatsKeys | null;
}

export interface SpecialResultStatProps {
  name: SpecialStatsKeys;
  label: string;
  value: number;
  hoveredStat?: SpecialStatsKeys | null;
  onHoverChange?: (stat: SpecialStatsKeys | null) => void;
}

//* HACKING
export interface HackingGameBaseProps {
  onGuess: (word: string) => boolean;
  gameOver: boolean;
  log: string[];
  setOnWordHover: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface MemoryDumpGridProps extends HackingGameBaseProps {
  leftColumn: string[];
  rightColumn: string[];
}

export interface TerminalIntroProps {
  attemptsLeft: number;
  resetGame: () => void;
}

export interface DumpColumnProps extends Omit<HackingGameBaseProps, "log"> {
  lines: string[];
}

export interface LineWithClickableWordsProps
  extends Omit<HackingGameBaseProps, "log"> {
  line: string;
}

export interface TerminalLogProps
  extends Pick<HackingGameBaseProps, "log" | "gameOver"> {
  onWordHover: string | null;
}

//* GOAT
export type Skills = {
  barter: number;
  bigGuns: number;
  energyWeapons: number;
  explosives: number;
  lockpick: number;
  medicine: number;
  meleeWeapons: number;
  repair: number;
  science: number;
  smallGuns: number;
  sneak: number;
  speech: number;
  unarmed: number;
  survival: number;
};
export type GoatQuestion = {
  id: number;
  question: string;
  image?: string;
  answers: {
    id: string; //* A, B, C, D
    text: string;
    tags?: string[]; //* optional skill tags for backend skill boosts, e.g. ["barter", "speech"]
  }[];
};
