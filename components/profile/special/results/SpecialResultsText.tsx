import React from "react";

function SpecialResultText() {
  return (
    <div className="flex flex-col justify-between gap-6">
      <div className="border rounded-md p-4">
        {/* This will be your dynamic flavor text */}
        <p className="text-lg sm:text-xl font-[roboto-mono] leading-10">
          Your stats suggest high survivability in post-apocalyptic
          environments... Your stats suggest high survivability in
          post-apocalyptic environments... Your stats suggest high survivability
          in post-apocalyptic environments... Your stats suggest high
          survivability in post-apocalyptic environments...
        </p>
      </div>

      <div className="text-sm sm:text-base text-muted-foreground font-[roboto-mono] text-center italic">
        <p className="text-3xl">
          Thank you. You may proceed to the G.O.A.T. evaluation.
        </p>
      </div>
    </div>
  );
}

export default SpecialResultText;
