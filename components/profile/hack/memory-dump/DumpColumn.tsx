import { DumpColumnProps } from "@/types/profile";
import LineWithClickableWords from "./LineWithClickableWords";

function DumpColumn({
  lines,
  onGuess,
  setOnWordHover,
  gameOver,
}: DumpColumnProps) {
  return (
    <div>
      {lines.map((line, i) => (
        <div key={i} className="flex flex-wrap">
          <LineWithClickableWords
            setOnWordHover={setOnWordHover}
            line={line}
            onGuess={onGuess}
            gameOver={gameOver}
          />
        </div>
      ))}
    </div>
  );
}

export default DumpColumn;
