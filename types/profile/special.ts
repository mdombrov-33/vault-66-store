import { specialSchema } from "@/utils/validation/schemas";
import { z } from "zod";
import React from "react";

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
