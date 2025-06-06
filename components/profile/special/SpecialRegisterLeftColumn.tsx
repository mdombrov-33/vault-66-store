import React from "react";
import SpecialRegisterInput from "@/components/profile/special/SpecialRegisterInput";
import {
  SpecialRegisterLeftColumnProps,
  SpecialStats,
  SpecialStatsKeys,
} from "@/types/profile";

function SpecialRegisterLeftColumn({
  onHoverChange,
  hoveredStat,
  specialStats,
  setSpecialStats,
  remainingPoints,
}: SpecialRegisterLeftColumnProps) {
  const handleIncrement = (name: keyof SpecialStats) => {
    if (remainingPoints <= 0) return;
    setSpecialStats((prev) => ({
      ...prev,
      [name]: Math.min(prev[name] + 1, 10),
    }));
  };

  const handleDecrement = (name: SpecialStatsKeys) => {
    setSpecialStats((prev) => ({
      ...prev,
      [name]: Math.max(prev[name] - 1, 1),
    }));
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <SpecialRegisterInput
        name="strength"
        label="Strength"
        value={specialStats.strength}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
      />
      <SpecialRegisterInput
        name="perception"
        label="Perception"
        value={specialStats.perception}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
      />
      <SpecialRegisterInput
        name="endurance"
        label="Endurance"
        value={specialStats.endurance}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
      />
      <SpecialRegisterInput
        name="charisma"
        label="Charisma"
        value={specialStats.charisma}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
      />
      <SpecialRegisterInput
        name="intelligence"
        label="Intelligence"
        value={specialStats.intelligence}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
      />
      <SpecialRegisterInput
        name="agility"
        label="Agility"
        value={specialStats.agility}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
      />
      <SpecialRegisterInput
        name="luck"
        label="Luck"
        value={specialStats.luck}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
      />
    </div>
  );
}

export default SpecialRegisterLeftColumn;
