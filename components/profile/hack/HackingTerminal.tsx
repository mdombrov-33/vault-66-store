"use client";
import { useState } from "react";
import { generateLines } from "@/data/profile/hack/memoryDump";
import MemoryDump from "./MemoryDumpGrid";
import TerminalIntro from "./TerminalIntro";

// const correctPassword = "HUNTER";

export default function HackingTerminal() {
  // function handleGuess(word: string) {
  //   if (word !== correctPassword) {
  //     setAttempts((prev) => Math.max(prev - 1, 0));
  //     setLog((prevLog) => [`> ${word} - Access Denied`, ...prevLog]);
  //   } else {
  //     setLog((prevLog) => [`> ${word} - Access Granted`, ...prevLog]);
  //   }
  // }

  const [leftRight, setLeftRight] = useState(() => generateLines());
  // const [attempts, setAttempts] = useState(4);

  return (
    <section className="bg-black text-primary flex flex-col items-center justify-center py-10 px-2 sm:py-20 sm:px-4">
      <div className="w-full min-h-[200px] sm:h-[800x] max-w-7xl p-3 sm:p-4 text-md sm:text-lg overflow-hidden bg-[#020202] whitespace-pre font-mono">
        <TerminalIntro />

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
    </section>
  );
}
