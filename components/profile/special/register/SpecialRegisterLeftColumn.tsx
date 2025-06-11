import React from "react";
import SpecialRegisterInput from "@/components/profile/special/register/SpecialRegisterInput";
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
      {Object.entries(specialStats).map(([statKey, statValue]) => {
        return (
          <SpecialRegisterInput
            key={statKey}
            name={statKey as SpecialStatsKeys}
            label={statKey}
            value={statValue}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onHoverChange={onHoverChange}
            hoveredStat={hoveredStat}
          />
        );
      })}
    </div>
  );
}

export default SpecialRegisterLeftColumn;
