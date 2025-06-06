import { specialSchema } from "@/utils/schemas";
import { z } from "zod";

export interface SpecialRecord {
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
