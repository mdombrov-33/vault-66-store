"use client";

import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import LeftColumn from "@/components/profile/special/LeftColumn";
import RightColumn from "@/components/profile/special/RightColumn";
import { createSpecialAction } from "@/utils/actions";
import { useState } from "react";

function SpecialPageWrapper() {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  return (
    <>
      <h2 className="text-5xl -mt-6 text-center">
        Welcome to Your S.P.E.C.I.A.L. Profile
      </h2>
      <p className="md:text-lg text-sm  max-w-2xl mx-auto mt-2 font-[roboto] text-muted-foreground">
        Out here, everyone&#39;s got a role to play. Assign your S.P.E.C.I.A.L.
        stats and prove your worth — then take the G.O.A.T. Test to see where
        you fit in Vault 66’s trading network.
      </p>

      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 px-4 py-8l mt-12 mx-auto">
        <FormContainer action={createSpecialAction}>
          <div className="md:self-start">
            <LeftColumn
              onHoverChange={setHoveredStat}
              hoveredStat={hoveredStat}
            />
          </div>
          <div className="flex items-center justify-center ">
            <SubmitButton
              text="register"
              className="text-xl sm:text-2xl mt-12 uppercase"
            />
          </div>
        </FormContainer>

        <div className="hidden md:block">
          <RightColumn hoveredStat={hoveredStat} />
        </div>
      </div>
    </>
  );
}

export default SpecialPageWrapper;
