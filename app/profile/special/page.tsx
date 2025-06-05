import { getSpecialRecord } from "@/utils/profile";
import SpecialPageWrapper from "./SpecialPageWrapper";

async function SpecialPage() {
  const specialRecord = await getSpecialRecord();

  if (!specialRecord) {
    return <SpecialPageWrapper />;
  }

  //* LOGIC if stats were allocated
  return <p>you already registred</p>;
}

export default SpecialPage;
