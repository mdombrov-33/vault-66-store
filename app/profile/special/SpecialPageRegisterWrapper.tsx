"use client";

import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import SpecialRegisterLeftColumn from "@/components/profile/special/SpecialRegisterLeftColumn";
import SpecialRegisterRightColumn from "@/components/profile/special/SpecialRegisterRightColumn";
import SpecialRegisterHeader from "@/components/profile/special/SpecialRegisterHeader";
import { createSpecialAction } from "@/utils/actions";
import { useState } from "react";

function SpecialPageWrapper() {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  return (
    <>
      <SpecialRegisterHeader />
      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 px-4 py-8l mt-12">
        <FormContainer action={createSpecialAction}>
          <div className="md:self-start">
            <SpecialRegisterLeftColumn
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
          <SpecialRegisterRightColumn hoveredStat={hoveredStat} />
        </div>
      </div>
    </>
  );
}

export default SpecialPageWrapper;
