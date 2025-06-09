import { skillSchema, specialSchema } from "@/utils/validation/schemas";
import React from "react";
import { z } from "zod";

//* SPECIAL
export type SpecialRecord = {
  id: string;
  clerkId: string;
  strength: number;
  endurance: number;
  perception: number;
  charisma: number;
  intelligence: number;
  agility: number;
  luck: number;
  isAllocated?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SpecialStats = z.infer<typeof specialSchema>;
export type SpecialStatsKeys = keyof SpecialStats;

export interface SpecialHoverProps {
  hoveredStat: SpecialStatsKeys | null;
  onHoverChange: (stat: SpecialStatsKeys | null) => void;
}

export interface SpecialRegisterProps extends SpecialHoverProps {
  specialStats: SpecialStats;
  setSpecialStats: React.Dispatch<React.SetStateAction<SpecialStats>>;
  remainingPoints: number;
}

export type SpecialRegisterLeftColumnProps = SpecialRegisterProps;
export interface SpecialRegisterRightColumnProps {
  hoveredStat: SpecialStatsKeys | null;
}

export interface SpecialRegisterHeaderProps {
  remainingPoints: number;
}

export interface SpecialRegisterInputProps extends SpecialHoverProps {
  name: SpecialStatsKeys;
  label: string;
  value: number;
  min?: number;
  max?: number;
  onIncrement: (name: SpecialStatsKeys) => void;
  onDecrement: (name: SpecialStatsKeys) => void;
}

export interface SpecialResultStatProps {
  name: SpecialStatsKeys;
  label: string;
  value: number;
  hoveredStat?: SpecialStatsKeys | null;
  onHoverChange?: (stat: SpecialStatsKeys | null) => void;
}

export interface SpecialPageResultsProps {
  specialRecord: SpecialRecord;
}

//* HACKING
interface HackingGameBaseProps {
  onGuess: (word: string) => boolean;
  gameOver: boolean;
  log: string[];
}

interface HackingHoverProps {
  onWordHover: string | null;
  setOnWordHover: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface MemoryDumpGridProps
  extends HackingGameBaseProps,
    HackingHoverProps {
  leftColumn: string[];
  rightColumn: string[];
}

export interface TerminalIntroProps
  extends Pick<HackingHoverProps, "setOnWordHover"> {
  attemptsLeft: number;
  resetGame: () => void;
  setIsIntroDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ResetBtnProps = Pick<
  TerminalIntroProps,
  "resetGame" | "setOnWordHover"
>;

export interface DumpColumnProps
  extends Omit<HackingGameBaseProps, "log">,
    Pick<HackingHoverProps, "setOnWordHover"> {
  lines: string[];
}
export interface LineWithClickableWordsProps
  extends Omit<HackingGameBaseProps, "log">,
    Pick<HackingHoverProps, "setOnWordHover"> {
  line: string;
}

export interface TerminalLogProps
  extends Pick<HackingGameBaseProps, "log" | "gameOver"> {
  onWordHover: string | null;
}

//* GOAT
export type SkillAttributes = z.infer<typeof skillSchema>;
export interface Skills extends SkillAttributes {
  isGoatCompleted: boolean;
}

export type SkillKeys = keyof SkillAttributes;

export interface GoatSkillsProps {
  skills: Skills;
  isGoatCompleted: boolean;
}

export type GoatStage = "intro" | "test" | "tagging" | "final";

export interface GoatTestProps {
  setStage: React.Dispatch<React.SetStateAction<GoatStage>>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>;
}

export interface GoatResultProps extends GoatSkillsProps {
  answers: Record<number, string>;
}

export interface GoatSkillTaggerProps
  extends Omit<GoatSkillsProps, "isGoatCompleted">,
    Pick<GoatResultProps, "answers"> {
  onFinish: () => void;
}

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

export interface GoatBaseProps {
  currentQuestion: GoatQuestion;
  currentQuestionIndex: number;
}

export interface GoatIntroProps {
  handleStart: () => void;
}
export interface GoatAnswersProps {
  currentQuestion: GoatQuestion;
  onAnswer: (answerKey: string) => void;
}

export interface GoatTaggerSummaryProps {
  selectedCount: number;
  totalCount: number;
}

export interface GoatHoverProps {
  hoveredSkill: SkillKeys | null;
  setHoveredSkill: (skill: SkillKeys | null) => void;
}

export interface GoatSkillSelectionProps {
  selectedSkills: Record<SkillKeys, boolean>;
  setSelectedSkills: React.Dispatch<
    React.SetStateAction<Record<SkillKeys, boolean>>
  >;
}

export interface GoatBoostedSkillsProps {
  boostedSkills: Record<SkillKeys, number>;
}

export interface GoatTaggerLeftSectionProps
  extends Pick<GoatHoverProps, "setHoveredSkill">,
    GoatSkillSelectionProps,
    GoatBoostedSkillsProps {}

export interface GoatTaggerLeftColumnProps
  extends GoatBoostedSkillsProps,
    GoatSkillSelectionProps,
    Pick<GoatHoverProps, "setHoveredSkill"> {}
