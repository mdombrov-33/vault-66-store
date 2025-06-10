import React from "react";
import { GoatFinalResultsProps } from "@/types/profile";
import { GiBottleCap } from "react-icons/gi";
import { getVaultOccupation } from "@/utils/text/goat-result-text";

function GoatFinalResults({
  finalSkills,
  taggedSkills,
}: GoatFinalResultsProps) {
  return (
    <div className="max-w-4xl mx-auto text-xl -mt-4 px-4 ">
      <h2 className="text-4xl font-semibold mb-6  uppercase tracking-wide">
        Skills
      </h2>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        role="list"
      >
        {Object.entries(finalSkills).map(([skill, value]) => {
          const isTagged = taggedSkills.includes(skill);
          return (
            <div
              key={skill}
              className="bg-background border border-muted rounded-lg p-5 flex items-center justify-between shadow-sm hover:shadow-md transition cursor-default"
              role="listitem"
              tabIndex={0}
              aria-label={`${skill} skill, value ${value}, ${
                isTagged ? "tagged" : "not tagged"
              }`}
            >
              <div className="capitalize font-medium text-2xl text-muted-foreground">
                {skill.replace(/([A-Z])/g, " $1")}
              </div>
              <div className="font-bold text-2xl tabular-nums text-muted-foreground mx-4">
                {value}
              </div>
              {isTagged && (
                <div
                  className="text-primary text-2xl select-none"
                  aria-hidden="true"
                >
                  <GiBottleCap />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dynamic text below */}
      <div
        className="mt-8 p-4 bg-muted rounded-md text-3xl text-muted-foreground font-[roboto-mono] max-w-4xl mx-auto"
        aria-live="polite"
        aria-atomic="true"
      >
        {getVaultOccupation(finalSkills, taggedSkills)}
      </div>
    </div>
  );
}

export default GoatFinalResults;
