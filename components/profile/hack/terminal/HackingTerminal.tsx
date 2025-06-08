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
    <section className="text-primary flex flex-col items-center justify-center px-2 py-4 sm:px-4">
      <div className="w-full max-w-7xl p-3 sm:p-4 overflow-hidden bg-[var(--terminal-background)]  text-[var(--terminal-text)] whitespace-pre font-mono">
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
