import { DumpColumnProps } from "@/types/profile";
import LineWithClickableWords from "./LineWithClickableWords";
import { motion } from "framer-motion";

function DumpColumn({
  lines,
  onGuess,
  setOnWordHover,
  gameOver,
}: DumpColumnProps) {
  return (
    <div>
      {lines.map((line, i) => (
        <motion.div key={i}>
          <div className="flex flex-wrap">
            <LineWithClickableWords
              setOnWordHover={setOnWordHover}
              line={line}
              onGuess={onGuess}
              gameOver={gameOver}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default DumpColumn;
