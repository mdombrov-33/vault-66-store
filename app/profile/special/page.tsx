import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import LeftColumn from "@/components/profile/special/LeftColumn";
import { createSpecialAction } from "@/utils/actions";

function SpecialPage() {
  return (
    <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 px-4 py-8">
      <FormContainer action={createSpecialAction}>
        <LeftColumn />
        <div className="flex justify-center md:items-start">
          <SubmitButton text="register" className="text-xl sm:text-2xl mt-12" />
        </div>
      </FormContainer>
    </div>
  );
}

export default SpecialPage;
