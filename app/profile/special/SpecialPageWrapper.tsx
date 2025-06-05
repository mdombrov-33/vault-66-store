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
      <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 px-4 py-8 h-full">
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
