import { MemoryDumpGridProps } from "@/types/profile";
import TerminalLog from "../terminal/TerminalLog";
import DumpColumn from "./DumpColumn";
import { useState } from "react";

function MemoryDumpGrid({
  leftColumn,
  rightColumn,
  onGuess,
  log,
  gameOver,
}: MemoryDumpGridProps) {
  const [onWordHover, setOnWordHover] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-4 gap-4 sm:gap-6 leading-tight text-primary text-sm md:text-xl mt-6 whitespace-pre">
      <div className="col-span-3 grid grid-cols-2 gap-x-4">
        <DumpColumn
          setOnWordHover={setOnWordHover}
          lines={leftColumn}
          onGuess={onGuess}
          gameOver={gameOver}
        />
        <DumpColumn
          setOnWordHover={setOnWordHover}
          lines={rightColumn}
          onGuess={onGuess}
          gameOver={gameOver}
        />
      </div>

      <div className="col-span-1 pl-4 break-words whitespace-pre-wrap">
        <TerminalLog gameOver={gameOver} onWordHover={onWordHover} log={log} />
      </div>
    </div>
  );
}

export default MemoryDumpGrid;
