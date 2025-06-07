import { LineWithClickableWordsProps } from "@/types/profile";
import { cn } from "@/utils/cn";
import { useHackingSounds } from "../hooks/useHackingSounds";

const allowedCharsRegex = /[^\&@]/g; //* This matches everything except & and @

function LineWithClickableWords({
  line,
  onGuess,
  setOnWordHover,
  gameOver,
}: LineWithClickableWordsProps) {
  const {
    playHackingHoverSound,
    playHackingClickSound,
    playHackingScrollSound,
  } = useHackingSounds();

  const handleClick = (word: string) => {
    if (gameOver) return;
    onGuess(word);
    playHackingClickSound();
  };

  const handleMouseEnter = (word: string) => {
    if (gameOver) return;
    setOnWordHover(word);
    playHackingHoverSound();
  };

  const handleMouseLeave = () => {
    if (gameOver) return;
    setOnWordHover(null);
  };

  const handleFocus = (word: string) => {
    if (gameOver) return;
    setOnWordHover(word);
    playHackingScrollSound();
  };

  return (
    <>
      {line.split(/(\[.*?\])/).map((part, idx) => {
        const isWord = part.startsWith("[") && part.endsWith("]");
        const word = part.slice(1, -1); // Remove brackets

        return isWord ? (
          <button
            onMouseEnter={() => handleMouseEnter(word)}
            onMouseLeave={() => handleMouseLeave()}
            onFocus={() => handleFocus(word)}
            key={idx}
            onClick={() => handleClick(word)}
            className={cn(
              "all-none",
              !gameOver
                ? "cursor-pointer focus:outline focus:outline-offset-1 hover:bg-primary hover:text-[var(--hacking-text)]"
                : "focus:outline focus:outline-offset-1"
            )}
          >
            {word}
          </button>
        ) : (
          <span key={idx}>{part.match(allowedCharsRegex)?.join("")}</span>
        );
      })}
    </>
  );
}

export default LineWithClickableWords;
