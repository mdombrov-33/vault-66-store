import { DumpColumnProps } from "@/types/profile";
import LineWithClickableWords from "./LineWithClickableWords";
import { motion } from "framer-motion";

function DumpColumn({
  lines,
  onGuess,
  setOnWordHover,
  gameOver,
  delay = 0,
}: DumpColumnProps & { delay?: number }) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          variants={lineVariants}
          transition={{ duration: 0.05 }}
        >
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
    </motion.div>
  );
}

export default DumpColumn;
