"use client";
import MemoryDumpGrid from "../memory-dump/MemoryDumpGrid";
import { useHackingGame } from "../hooks/useHackingGame";
import TerminalIntro from "./TerminalIntro";

export default function HackingTerminal() {
  const { gameState, attemptsLeft, log, handleGuess, resetGame, gameOver } =
    useHackingGame(5);

  return (
    <section className="text-primary flex flex-col items-center justify-center px-2 sm:px-4 pb-4">
      <div className="w-full h-full max-w-7xl p-3 sm:p-4 text-md sm:text-lg overflow-hidden bg-[#020202] whitespace-pre font-mono">
        <TerminalIntro attemptsLeft={attemptsLeft} resetGame={resetGame} />
        <div className="mt-2">
          <MemoryDumpGrid
            leftColumn={gameState.leftColumn}
            rightColumn={gameState.rightColumn}
            onGuess={handleGuess}
            log={log}
            gameOver={gameOver}
          />
        </div>
      </div>
    </section>
  );
}
