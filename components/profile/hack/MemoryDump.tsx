import { MemoryDumpProps } from "@/types/profile";

export default function MemoryDump({
  leftColumn,
  rightColumn,
}: MemoryDumpProps) {
  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6 leading-tight text-primary text-sm md:text-lg mt-6 whitespace-pre font-mono">
      {/* Left & Right Columns */}
      <div className="col-span-2 grid grid-cols-2 gap-x-8">
        <div>
          {leftColumn.map((line, i) => (
            <div key={`left-${i}`}>{line}</div>
          ))}
        </div>
        <div>
          {rightColumn.map((line, i) => (
            <div key={`right-${i}`}>{line}</div>
          ))}
        </div>
      </div>

      {/* Feedback column */}
      <div className="text-primary text-sm sm:text-xl">
        <p>Click a word to guess the password.</p>
        <p className="mt-2">
          Last Entry: <span className="text-muted-foreground">2/7 correct</span>
        </p>
      </div>
    </div>
  );
}
