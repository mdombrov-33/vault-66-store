import { GoatTaggerSummaryProps } from "@/types/profile";

function GoatTaggerSummary({
  selectedCount,
  totalCount,
}: GoatTaggerSummaryProps) {
  return (
    <div className="mb-4 px-2 text-md text-2xl">
      SKILLS : {selectedCount} / {totalCount} selected
    </div>
  );
}

export default GoatTaggerSummary;
