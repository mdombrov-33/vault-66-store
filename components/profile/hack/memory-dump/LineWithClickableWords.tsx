import { LineWithClickableWordsProps } from "@/types/profile";

function LineWithClickableWords({
  line,
  onGuess,
}: LineWithClickableWordsProps) {
  return (
    <>
      {line.split(/(\[.*?\])/).map((part, idx) => {
        const isWord = part.startsWith("[") && part.endsWith("]");
        const word = part.slice(1, -1); // Remove brackets

        return isWord ? (
          <span
            key={idx}
            role="button"
            tabIndex={0}
            onClick={() => onGuess(word)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && onGuess(word)
            }
            className="cursor-pointer px-1 rounded-sm text-lime-400 underline decoration-dotted underline-offset-2 hover:bg-lime-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            {word}
          </span>
        ) : (
          <span key={idx}>{part}</span>
        );
      })}
    </>
  );
}

export default LineWithClickableWords;
