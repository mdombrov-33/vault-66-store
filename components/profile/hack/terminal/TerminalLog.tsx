import { TerminalLogProps } from "@/types/profile";

function TerminalLog({ log, onWordHover, gameOver }: TerminalLogProps) {
  return (
    <div className="">
      {log.map((entry, i) => (
        <p className="text-lg" key={i}>
          {entry}
        </p>
      ))}
      {!gameOver && onWordHover && (
        <p className="text-lg text-primary">{`> ${onWordHover}`}</p>
      )}
    </div>
  );
}

export default TerminalLog;
