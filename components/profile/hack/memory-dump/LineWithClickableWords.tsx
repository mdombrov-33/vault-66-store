import { LineWithClickableWordsProps } from "@/types/profile";
import { cn } from "@/utils/cn";

const allowedCharsRegex = /[^\&@]/g; // This matches everything except & and @

function LineWithClickableWords({
  line,
  onGuess,
  setOnWordHover,
  gameOver,
}: LineWithClickableWordsProps) {
  return (
    <>
      {line.split(/(\[.*?\])/).map((part, idx) => {
        const isWord = part.startsWith("[") && part.endsWith("]");
        const word = part.slice(1, -1); // Remove brackets

        return isWord ? (
          <button
            onMouseEnter={() => {
              if (!gameOver) {
                setOnWordHover(word);
              }
            }}
            onMouseLeave={() => {
              if (!gameOver) {
                setOnWordHover(word);
              }
            }}
            key={idx}
            onClick={() => onGuess(word)}
            className={cn(
              "all-none",
              !gameOver &&
                "cursor-pointer focus:outline focus:outline-offset-1 hover:bg-primary hover:text-[var(--hacking-text)]"
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
