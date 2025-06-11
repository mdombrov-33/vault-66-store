"use client";
import MemoryDumpGrid from "../memory-dump/MemoryDumpGrid";
import { useHackingGame } from "../hooks/useHackingGame";
import TerminalIntro from "./TerminalIntro";
import { useState } from "react";

export default function HackingTerminal() {
  const { gameState, attemptsLeft, log, handleGuess, resetGame, gameOver } =
    useHackingGame(4);
  const [onWordHover, setOnWordHover] = useState<string | null>(null);
  const [isIntroDone, setIsIntroDone] = useState(false);

  return (
    <section className="text-primary flex flex-col items-center justify-center sm:px-4 pb-20 xl:pb-0">
      <div className="w-full max-w-7xl p-3 sm:p-4 overflow-hidden bg-[var(--terminal-background)] text-[var(--terminal-text)] whitespace-pre font-mono">
        <TerminalIntro
          attemptsLeft={attemptsLeft}
          resetGame={resetGame}
          setOnWordHover={setOnWordHover}
          setIsIntroDone={setIsIntroDone}
        />
        {isIntroDone && (
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
        )}
      </div>
    </section>
  );
}
