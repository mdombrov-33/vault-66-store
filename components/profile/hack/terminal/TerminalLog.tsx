import { TerminalLogProps } from "@/types/profile";

function TerminalLog({ log, onWordHover, gameOver }: TerminalLogProps) {
  return (
    <div>
      {log.map((entry, i) => (
        <p className="text-[0.6rem] md:text-lg lg:text-xl" key={i}>
          {entry}
        </p>
      ))}
      {!gameOver && onWordHover && (
        <p className="text-[0.6rem] md:text-lg lg:text-xl text-[var(--terminal-text)">{`> ${onWordHover}`}</p>
      )}
    </div>
  );
}

export default TerminalLog;
