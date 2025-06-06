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

export interface SpecialRegisterRightColumnProps {
  hoveredStat: string | null;
}

export interface SpecialRegisterLeftColumnProps
  extends SpecialRegisterRightColumnProps {
  onHoverChange: (stat: string | null) => void;
}
