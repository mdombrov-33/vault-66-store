import { MemoryDumpGridProps } from "@/types/profile";
import TerminalLog from "../terminal/TerminalLog";
import DumpColumn from "./DumpColumn";

function MemoryDumpGrid({
  leftColumn,
  rightColumn,
  onGuess,
  log,
}: MemoryDumpGridProps) {
  return (
    <div className="grid grid-cols-4 gap-4 sm:gap-6 leading-tight text-primary text-sm md:text-xl mt-6 whitespace-pre">
      <div className="col-span-3 grid grid-cols-2 gap-x-4">
        <DumpColumn lines={leftColumn} onGuess={onGuess} />
        <DumpColumn lines={rightColumn} onGuess={onGuess} />
      </div>

      <div className="col-span-1 pl-4 break-words whitespace-pre-wrap">
        <TerminalLog log={log} />
      </div>
    </div>
  );
}

export default MemoryDumpGrid;
