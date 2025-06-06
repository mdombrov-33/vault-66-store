import { getSpecialRecord } from "@/utils/profile";
import SpecialPageRegisterWrapper from "./SpecialPageRegisterWrapper";

async function SpecialPage() {
  const specialRecord = await getSpecialRecord();

  if (!specialRecord) {
    return <SpecialPageRegisterWrapper />;
  }

  //* LOGIC if stats were allocated
  return <p>you already registred</p>;
}

export default SpecialPage;
