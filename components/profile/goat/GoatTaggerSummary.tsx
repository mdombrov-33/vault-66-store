import { GoatTaggerSummaryProps } from "@/types/profile";

function GoatTaggerSummary({
  selectedCount,
  totalCount,
}: GoatTaggerSummaryProps) {
  return (
    <div className="mb-4 text-md text-primary text-2xl">
      {selectedCount} / {totalCount}
    </div>
  );
}

export default GoatTaggerSummary;
