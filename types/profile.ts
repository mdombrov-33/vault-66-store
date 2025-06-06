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

export interface SpecialRegisterRightColumnProps {
  hoveredStat: string | null;
}

export interface SpecialRegisterLeftColumnProps
  extends SpecialRegisterRightColumnProps {
  onHoverChange: (stat: string | null) => void;
  specialStats: SpecialStats;
  setSpecialStats: React.Dispatch<React.SetStateAction<SpecialStats>>;
  remainingPoints: number;
}

export interface SpecialRegisterHeaderProps {
  remainingPoints: number;
}
