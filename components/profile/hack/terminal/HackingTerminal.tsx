"use client";
import { useState } from "react";
import { generateLines } from "@/components/profile/hack/memory-dump/memoryDump";
import MemoryDumpGrid from "../memory-dump/MemoryDumpGrid";
import TerminalIntro from "./TerminalIntro";
import { Button } from "@/components/ui/button";

export default function HackingTerminal() {
  const [leftRight, setLeftRight] = useState(() => generateLines());
  const [correctPassword, setCorrectPassword] = useState(() => {
    const words = leftRight.allWords;
    return words[Math.floor(Math.random() * words.length)];
  });
  const [gameState, setGameState] = useState(() => initGame());
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [log, setLog] = useState<string[]>([]);

  function initGame() {
    const generated = generateLines();
    const correct =
      generated.allWords[Math.floor(Math.random() * generated.allWords.length)];
    return { ...generated, correctPassword: correct };
  }

  function resetGame() {
    setGameState(initGame());
    setAttemptsLeft(4);
    setLog([]);
  }

  function getCorrectLetterCount(a: string, b: string) {
    let count = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] === b[i]) count++;
    }
    return count;
  }

  function handleGuess(word: string) {
    if (attemptsLeft <= 0) return;

    if (word === gameState.correctPassword) {
      setLog((prev) => [...prev, `> ${word}`, "ACCESS GRANTED"]);
      // Optionally lock out further interaction
      setAttemptsLeft(0);
    } else {
      const correctLetters = getCorrectLetterCount(
        word,
        gameState.correctPassword
      );
      setLog((prev) => [
        ...prev,
        `> ${word}`,
        `Entry denied. Likeness=${correctLetters}`,
      ]);
      setAttemptsLeft((prev) => prev - 1);

      if (attemptsLeft - 1 <= 0) {
        setLog((prev) => [...prev, "LOGIN FAILURE - TERMINAL LOCKED"]);
      }
    }
  }

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
          />
        </div>

        {attemptsLeft === 0 && (
          <Button
            className="mt-4 px-4 py-2 bg-primary text-black rounded hover:bg-primary/80 text-lg"
            onClick={resetGame}
            size={"lg"}
          >
            Try Again
          </Button>
        )}
      </div>
    </section>
  );
}
