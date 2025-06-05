import React from "react";
import SpecialInput from "@/components/profile/special/SpecialInput";

function LeftColumn({
  onHoverChange,
}: {
  onHoverChange: (stat: string | null) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <SpecialInput
        onHoverChange={onHoverChange}
        name="strength"
        label="strength"
      />
      <SpecialInput
        onHoverChange={onHoverChange}
        name="perception"
        label="perception"
      />
      <SpecialInput
        onHoverChange={onHoverChange}
        name="endurance"
        label="endurance"
      />
      <SpecialInput
        onHoverChange={onHoverChange}
        name="charisma"
        label="charisma"
      />
      <SpecialInput
        onHoverChange={onHoverChange}
        name="intelligence"
        label="intelligence"
      />
      <SpecialInput
        onHoverChange={onHoverChange}
        name="agility"
        label="agility"
      />
      <SpecialInput onHoverChange={onHoverChange} name="luck" label="luck" />
    </div>
  );
}

export default LeftColumn;
