"use client";

import { useState } from "react";
import SpecialInput from "./SpecialInput";
import StrengthDude from "@/public/special/strength.png";

function RightColumn({ hoveredStat }: { hoveredStat: string | null }) {
  return (
    <div className="p-4">
      {hoveredStat ? (
        <p>Hovering over: {hoveredStat}</p>
      ) : (
        <p>Hover over a stat</p>
      )}
    </div>
  );
}

export default RightColumn;
