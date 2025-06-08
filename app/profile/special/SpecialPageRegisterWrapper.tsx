"use client";

import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import SpecialRegisterLeftColumn from "@/components/profile/special/register/SpecialRegisterLeftColumn";
import SpecialRegisterRightColumn from "@/components/profile/special/register/SpecialRegisterRightColumn";
import SpecialRegisterHeader from "@/components/profile/special/register/SpecialRegisterHeader";
import { createSpecialAction } from "@/utils/actions/special";
import { useState } from "react";
import { SpecialStats, SpecialStatsKeys } from "@/types/profile";

const TOTAL_POINTS = 28;

function SpecialPageWrapper() {
  const [hoveredStat, setHoveredStat] = useState<SpecialStatsKeys | null>(null);
  const [specialStats, setSpecialStats] = useState<SpecialStats>({
    strength: 1,
    perception: 1,
    endurance: 1,
    charisma: 1,
    intelligence: 1,
    agility: 1,
    luck: 1,
  });

  const allocatedPoints = Object.values(specialStats).reduce(
    (acc, cur) => acc + cur,
    0
  );

  const remainingPoints = TOTAL_POINTS - allocatedPoints;

  return (
    <>
      <SpecialRegisterHeader remainingPoints={remainingPoints} />
      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 px-4 pb-8 mt-12">
        <FormContainer action={createSpecialAction}>
          <div className="md:self-start">
            <SpecialRegisterLeftColumn
              onHoverChange={setHoveredStat}
              hoveredStat={hoveredStat}
              specialStats={specialStats}
              setSpecialStats={setSpecialStats}
              remainingPoints={remainingPoints}
            />
          </div>
          <div className="flex items-center justify-center ">
            <SubmitButton
              text="Submit S.P.E.C.I.A.L."
              className="text-xl sm:text-2xl mt-12 uppercase"
            />
          </div>
        </FormContainer>
        <div className="hidden md:block">
          <SpecialRegisterRightColumn hoveredStat={hoveredStat} />
        </div>
      </div>
    </>
  );
}

export default SpecialPageWrapper;
