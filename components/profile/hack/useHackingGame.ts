import { useState } from "react";
import { generateLines } from "@/components/profile/hack/memory-dump/memoryDump";

export function useHackingGame(initialAttempts = 5) {
  function initGame() {
    const generated = generateLines();
    const correct =
      generated.allWords[Math.floor(Math.random() * generated.allWords.length)];
    return { ...generated, correctPassword: correct };
  }

  const [gameState, setGameState] = useState(() => initGame());
  const [attemptsLeft, setAttemptsLeft] = useState(initialAttempts);
  const [log, setLog] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);

  function getLikeness(guess: string, correct: string): number {
    let likeness = 0;
    const length = Math.min(guess.length, correct.length);
    for (let i = 0; i < length; i++) {
      if (guess[i] === correct[i]) likeness++;
    }
    return likeness;
  }

  function handleGuess(word: string) {
    if (attemptsLeft <= 0 || gameOver) return;

    if (word === gameState.correctPassword) {
      setLog((prev) => [...prev, `> ${word}`, "ACCESS GRANTED"]);
      setAttemptsLeft(0);
      setGameOver(true);
    } else {
      const likeness = getLikeness(word, gameState.correctPassword);
      setLog((prev) => [
        ...prev,
        `> ${word}`,
        `Entry denied. Likeness=${likeness}`,
      ]);

      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);

      if (newAttempts <= 0) {
        setLog((prev) => [...prev, "LOGIN FAILURE - TERMINAL LOCKED"]);
        setGameOver(true);
      }
    }
  }

  function resetGame() {
    setGameState(initGame());
    setAttemptsLeft(initialAttempts);
    setLog([]);
    setGameOver(false);
  }

  return { gameState, attemptsLeft, log, handleGuess, resetGame, gameOver };
}
