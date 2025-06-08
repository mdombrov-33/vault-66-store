"use client";
import MemoryDumpGrid from "../memory-dump/MemoryDumpGrid";
import { useHackingGame } from "../hooks/useHackingGame";
import TerminalIntro from "./TerminalIntro";
import { useState } from "react";

export default function HackingTerminal() {
  const { gameState, attemptsLeft, log, handleGuess, resetGame, gameOver } =
    useHackingGame(4);
  const [onWordHover, setOnWordHover] = useState<string | null>(null);

  return (
    <section className="text-primary flex flex-col items-center justify-center px-2 sm:px-4 pb-4 -mt-6">
      <div className="w-full h-full max-w-7xl p-3 sm:p-4 text-md sm:text-lg overflow-hidden bg-[#020202] whitespace-pre font-mono">
        <TerminalIntro
          attemptsLeft={attemptsLeft}
          resetGame={resetGame}
          setOnWordHover={setOnWordHover}
        />
        <div className="mt-2">
          <MemoryDumpGrid
            leftColumn={gameState.leftColumn}
            rightColumn={gameState.rightColumn}
            onGuess={handleGuess}
            log={log}
            gameOver={gameOver}
            onWordHover={onWordHover}
            setOnWordHover={setOnWordHover}
          />
        </div>
      </div>
    </section>
  );
}
