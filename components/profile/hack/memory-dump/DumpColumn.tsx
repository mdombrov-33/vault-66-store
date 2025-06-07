import { DumpColumnProps } from "@/types/profile";
import LineWithClickableWords from "./LineWithClickableWords";

function DumpColumn({ lines, onGuess }: DumpColumnProps) {
  return (
    <div>
      {lines.map((line, i) => (
        <div key={i} className="flex flex-wrap">
          <LineWithClickableWords line={line} onGuess={onGuess} />
        </div>
      ))}
    </div>
  );
}

export default DumpColumn;
