import React from "react";
import SpecialRegisterInput from "@/components/profile/special/SpecialRegisterInput";
import { SpecialLeftColumnProps } from "@/types/profile";

function LeftColumn({ onHoverChange, hoveredStat }: SpecialLeftColumnProps) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <SpecialRegisterInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="strength"
        label="strength"
      />
      <SpecialRegisterInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="perception"
        label="perception"
      />
      <SpecialRegisterInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="endurance"
        label="endurance"
      />
      <SpecialRegisterInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="charisma"
        label="charisma"
      />
      <SpecialRegisterInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="intelligence"
        label="intelligence"
      />
      <SpecialRegisterInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="agility"
        label="agility"
      />
      <SpecialRegisterInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="luck"
        label="luck"
      />
    </div>
  );
}

export default LeftColumn;
