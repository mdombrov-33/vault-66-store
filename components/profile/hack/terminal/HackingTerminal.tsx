"use client";
import MemoryDumpGrid from "../memory-dump/MemoryDumpGrid";
import { useHackingGame } from "../hooks/useHackingGame";
import TerminalIntro from "./TerminalIntro";
import { Button } from "@/components/ui/button";

export default function HackingTerminal() {
  const { gameState, attemptsLeft, log, handleGuess, resetGame, gameOver } =
    useHackingGame(5);

  return (
    <section className="bg-black text-primary flex flex-col items-center justify-center px-2  sm:px-4">
      <div className="w-full min-h-[200px] sm:h-[px] max-w-7xl p-3 sm:p-4 text-md sm:text-lg overflow-hidden bg-[#020202] whitespace-pre font-mono">
        <TerminalIntro attemptsLeft={attemptsLeft} />
        <div className="mt-2">
          <MemoryDumpGrid
            leftColumn={gameState.leftColumn}
            rightColumn={gameState.rightColumn}
            onGuess={handleGuess}
            log={log}
            gameOver={gameOver}
          />
        </div>

        {attemptsLeft === 0 && (
          <Button
            className="mt-4 px-4 py-2 bg-primary text-black rounded hover:bg-primary/80 text-xl"
            onClick={resetGame}
            size={"lg"}
          >
            RETRY
          </Button>
        )}
      </div>
    </section>
  );
}
