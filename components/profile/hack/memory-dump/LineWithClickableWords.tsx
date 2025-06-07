import { LineWithClickableWordsProps } from "@/types/profile";

const allowedCharsRegex = /[^\&@]/g; // This matches everything except & and @

function LineWithClickableWords({
  line,
  onGuess,
  setOnWordHover,
}: LineWithClickableWordsProps) {
  return (
    <>
      {line.split(/(\[.*?\])/).map((part, idx) => {
        const isWord = part.startsWith("[") && part.endsWith("]");
        const word = part.slice(1, -1); // Remove brackets

        return isWord ? (
          <button
            onMouseEnter={() => setOnWordHover(word)}
            onMouseLeave={() => setOnWordHover(null)}
            key={idx}
            onClick={() => onGuess(word)}
            className="all-none cursor-pointer focus:outline focus:outline-offset-1 hover:bg-primary hover:text-[var(--hacking-text)]"
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
