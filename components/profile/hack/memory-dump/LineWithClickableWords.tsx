import { Button } from "@/components/ui/button";
import { LineWithClickableWordsProps } from "@/types/profile";

function LineWithClickableWords({
  line,
  onGuess,
}: LineWithClickableWordsProps) {
  console.log("Rendering line:", line);
  return (
    <>
      {line.split(/(\[.*?\])/).map((part, idx) => {
        const isWord = part.startsWith("[") && part.endsWith("]");
        const word = part.slice(1, -1); // Remove brackets

        return isWord ? (
          <button
            key={idx}
            onClick={() => onGuess(word)}
            className="all-none cursor-pointer focus:outline focus:outline-offset-1 hover:bg-primary hover:text-foreground"
          >
            {word}
          </button>
        ) : (
          <span key={idx}>{part}</span>
        );
      })}
    </>
  );
}

export default LineWithClickableWords;
