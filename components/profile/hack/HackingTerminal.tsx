"use client";
import { useState } from "react";
import { generateLines } from "@/data/profile/hack/memoryDump";
import MemoryDump from "./MemoryDump";
import { terminalLines } from "@/data/profile/hack/terminalLines";

export default function HackingTerminal() {
  const [leftRight, setLeftRight] = useState(() => generateLines());

  return (
    <div className="bg-black text-primary flex flex-col items-center justify-center py-10 px-2 sm:py-20 sm:px-4">
      <div className="w-full min-h-[300px] sm:h-[800x] max-w-[1900px] border border-primary p-3 sm:p-4 text-md sm:text-lg overflow-hidden shadow-inner shadow-primary/20 bg-[#020202] whitespace-pre font-mono">
        {terminalLines.map((line, index) => (
          <div key={`intro-${index}`}>{line}</div>
        ))}

        <div className="mt-2">
          <MemoryDump
            leftColumn={leftRight.leftColumn}
            rightColumn={leftRight.rightColumn}
          />
        </div>

        <button
          className="mt-4 px-4 py-2 bg-primary text-black rounded hover:bg-primary/80"
          onClick={() => {
            setLeftRight(generateLines());
          }}
        >
          Regenerate
        </button>
      </div>
    </div>
  );
}
