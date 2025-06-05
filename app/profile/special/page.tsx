import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import LeftColumn from "@/components/profile/special/LeftColumn";
import { createSpecialAction } from "@/utils/actions";
import db from "@/utils/db";
import { auth } from "@clerk/nextjs/server";

async function SpecialPage() {
  const { userId } = await auth();

  const specialRecord = await db.special.findUnique({
    where: {
      clerkId: userId as string,
    },
  });

  if (specialRecord) {
    return (
      <>
        <div className="grid w-full max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 px-4 py-8">
          <FormContainer action={createSpecialAction}>
            <LeftColumn />
            <div className="flex justify-center md:items-start">
              <SubmitButton
                text="register"
                className="text-xl sm:text-2xl mt-12 uppercase"
              />
            </div>
          </FormContainer>
          <div>aboba</div>
        </div>
      </>
    );
  }

  return <p>aboba</p>;
}

export default SpecialPage;
