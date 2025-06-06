import { getSpecialRecord } from "@/utils/profile";
import SpecialPageRegisterWrapper from "./SpecialPageRegisterWrapper";
import SpecialPageResults from "./SpecialPageResults";
import { SpecialRecord } from "@/types/profile";

async function SpecialPage() {
  const specialRecord: SpecialRecord | null = await getSpecialRecord();

  if (!specialRecord) {
    return <SpecialPageRegisterWrapper />;
  }

  //* LOGIC if stats were allocated
  return <SpecialPageResults specialRecord={specialRecord} />;
}

export default SpecialPage;
