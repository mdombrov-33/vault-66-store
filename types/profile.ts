import React from "react";
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

//* Base props for stat display
export interface StatDisplayBase {
  name: keyof z.infer<typeof specialSchema>;
  label: string;
  value: number;
}

//* Base props for hoverable stats
export interface HoverableStatProps extends StatDisplayBase {
  hoveredStat?: keyof z.infer<typeof specialSchema> | null;
  onHoverChange?: (stat: keyof z.infer<typeof specialSchema> | null) => void;
}

export type SpecialResultInputProps = StatDisplayBase;

export type SpecialRegisterRightColumnProps = HoverableStatProps;

export interface SpecialRegisterLeftColumnProps extends HoverableStatProps {
  onHoverChange: (stat: keyof z.infer<typeof specialSchema> | null) => void;
  setSpecialStats: React.Dispatch<
    React.SetStateAction<z.infer<typeof specialSchema>>
  >;
  specialStats: z.infer<typeof specialSchema>;
  remainingPoints: number;
}

export interface SpecialRegisterHeaderProps {
  remainingPoints: number;
}

export interface FormSpecialRegisterInput {
  name: keyof z.infer<typeof specialSchema>;
  label: string;
  min?: number;
  max?: number;
  value: number;
  onIncrement: (name: keyof z.infer<typeof specialSchema>) => void;
  onDecrement: (name: keyof z.infer<typeof specialSchema>) => void;
  onHoverChange: (stat: keyof z.infer<typeof specialSchema> | null) => void;
  hoveredStat?: keyof z.infer<typeof specialSchema> | null;
}

//* HACKING
//* Shared
export interface BaseHackingProps {
  onGuess: (word: string) => void;
  setOnWordHover: React.Dispatch<React.SetStateAction<string | null>>;
  gameOver: boolean;
}

export type WordHoverState = string | null;

//* Specific
export interface MemoryDumpGridProps {
  leftColumn: string[];
  rightColumn: string[];
  onGuess: (word: string) => void;
  log: string[];
  gameOver: boolean;
}

export interface TerminalIntroProps {
  attemptsLeft: number;
}

export interface DumpColumnProps extends BaseHackingProps {
  lines: string[];
}

export interface LineWithClickableWordsProps extends BaseHackingProps {
  line: string;
}

export interface TerminalLogProps {
  log: string[];
  onWordHover: WordHoverState;
  gameOver: boolean;
}
