import { TerminalLogProps } from "@/types/profile";

function TerminalLog({ log }: TerminalLogProps) {
  return (
    <div className="">
      {log.map((entry, i) => (
        <p className="text-lg" key={i}>
          {entry}
        </p>
      ))}
    </div>
  );
}

export default TerminalLog;
