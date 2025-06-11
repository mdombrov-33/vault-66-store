"use client";

import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import SpecialRegisterLeftColumn from "@/components/profile/special/register/SpecialRegisterLeftColumn";
import SpecialRegisterRightColumn from "@/components/profile/special/register/SpecialRegisterRightColumn";
import SpecialRegisterHeader from "@/components/profile/special/register/SpecialRegisterHeader";
import { createSpecialAction } from "@/utils/actions/special";
import { useState } from "react";
import { SpecialStats, SpecialStatsKeys } from "@/types/profile";
import { useSoundPlayer } from "@/hooks/useSoundPlayer";

const TOTAL_POINTS = 28;

function SpecialPageWrapper() {
  const { playClick } = useSoundPlayer();
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
    <section>
      <SpecialRegisterHeader remainingPoints={remainingPoints} />

      <FormContainer action={createSpecialAction}>
        <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 px-4 py-6 mx-auto">
          <div className="flex flex-col justify-between gap-8">
            <SpecialRegisterLeftColumn
              onHoverChange={setHoveredStat}
              hoveredStat={hoveredStat}
              specialStats={specialStats}
              setSpecialStats={setSpecialStats}
              remainingPoints={remainingPoints}
            />

            <div className="flex justify-center">
              <SubmitButton
                text="Submit S.P.E.C.I.A.L."
                className="text-xl sm:text-2xl uppercase w-64 max-w-md"
                onClick={() => playClick()}
              />
            </div>
          </div>

          <div className="hidden md:block">
            <SpecialRegisterRightColumn hoveredStat={hoveredStat} />
          </div>
        </div>
      </FormContainer>
    </section>
  );
}

export default SpecialPageWrapper;
