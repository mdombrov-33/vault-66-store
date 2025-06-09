import { TerminalLogProps } from "@/types/profile";

function TerminalLog({ log, onWordHover, gameOver }: TerminalLogProps) {
  return (
    <div className="">
      {log.map((entry, i) => (
        <p className="text-[0.6rem] md:text-md lg:text-xl" key={i}>
          {entry}
        </p>
      ))}
      {!gameOver && onWordHover && (
        <p className="text-[0.6rem] md:text-md lg:text-xl text-primary">{`> ${onWordHover}`}</p>
      )}
    </div>
  );
}

export default TerminalLog;
