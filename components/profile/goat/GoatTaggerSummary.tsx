import { GoatTaggerSummaryProps } from "@/types/profile";

function GoatTaggerSummary({
  selectedCount,
  totalCount,
}: GoatTaggerSummaryProps) {
  return (
    <div className="mb-4 text-md font-semibold text-primary">
      {selectedCount} / {totalCount}
    </div>
  );
}

export default GoatTaggerSummary;
