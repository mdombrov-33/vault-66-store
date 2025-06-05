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
      <h2 className="md:text-5xl text-3xl -mt-6 text-center">
        Welcome to Your S.P.E.C.I.A.L. Profile
      </h2>
      <p className="text-base text-muted-foreground sm:text-lg md:text-xl lg:text-lg max-w-xl mx-auto mt-2 px-4 text-center">
        Out here, everyone plays a part. Set your S.P.E.C.I.A.L. stats to unlock
        the G.O.A.T. Test and find your place in Vault 66’s trading network.
      </p>

      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 px-4 py-8l mt-12">
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
