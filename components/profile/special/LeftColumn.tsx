import React from "react";
import SpecialInput from "./ProfileSpecialInput";

function LeftColumn() {
  return (
    <div className="flex flex-col gap-4">
      <SpecialInput name="strength" label="strength" />
      <SpecialInput name="perception" label="perception" />
      <SpecialInput name="endurance" label="endurance" />
      <SpecialInput name="charisma" label="charisma" />
      <SpecialInput name="intelligence" label="intelligence" />
      <SpecialInput name="agility" label="agility" />
      <SpecialInput name="luck" label="luck" />
    </div>
  );
}

export default LeftColumn;
