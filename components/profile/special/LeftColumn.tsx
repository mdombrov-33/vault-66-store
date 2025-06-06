import React from "react";
import SpecialInput from "@/components/profile/special/SpecialInput";
import { HoverSpecialProps } from "@/types/profile";

function LeftColumn({ onHoverChange, hoveredStat }: HoverSpecialProps) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <SpecialInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="strength"
        label="strength"
      />
      <SpecialInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="perception"
        label="perception"
      />
      <SpecialInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="endurance"
        label="endurance"
      />
      <SpecialInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="charisma"
        label="charisma"
      />
      <SpecialInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="intelligence"
        label="intelligence"
      />
      <SpecialInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="agility"
        label="agility"
      />
      <SpecialInput
        onHoverChange={onHoverChange}
        hoveredStat={hoveredStat}
        name="luck"
        label="luck"
      />
    </div>
  );
}

export default LeftColumn;
