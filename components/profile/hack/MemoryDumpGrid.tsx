import { MemoryDumpProps } from "@/types/profile";
import TerminalLog from "./TerminalLog";
import DumpColumn from "./DumpColumn";

export default function MemoryDump({
  leftColumn,
  rightColumn,
}: MemoryDumpProps) {
  return (
    <div className="grid grid-cols-3 gap-4 sm:gap-6 leading-tight text-primary text-sm md:text-xl mt-6 whitespace-pre">
      {/* WORD GUESS */}
      <div className="col-span-2 grid grid-cols-2 gap-x-8">
        <DumpColumn lines={leftColumn} />
        <DumpColumn lines={rightColumn} />
      </div>
      {/* TERMINAL LOG */}
      <TerminalLog />
    </div>
  );
}
