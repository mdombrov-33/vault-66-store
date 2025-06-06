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

export interface SpecialRightColumnProps {
  hoveredStat: string | null;
}

export interface SpecialLeftColumnProps extends SpecialRightColumnProps {
  onHoverChange: (stat: string | null) => void;
}
