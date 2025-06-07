import { specialSchema } from "@/utils/validation/schemas";
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
export interface MemoryDumpProps {
  leftColumn: string[];
  rightColumn: string[];
  onGuess: (word: string) => void;
}

export interface TerminalIntroProps {
  attemptsLeft: number;
}

export interface DumpColumnProps {
  lines: string[];
  onGuess: (word: string) => void;
}

export interface LineWithClickableWordsProps {
  line: string;
  onGuess: (word: string) => void;
}
