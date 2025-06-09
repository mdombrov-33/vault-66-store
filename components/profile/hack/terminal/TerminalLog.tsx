import { TerminalLogProps } from "@/types/profile";
import TerminalTypewriter from "@/components/profile/hack/terminal/TerminalTypeWriter"; // path to the new component

function TerminalLog({ log, onWordHover }: TerminalLogProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 flex px-2 pb-8 overflow-y-auto">
        <div className="flex flex-col-reverse space-y-1 space-y-reverse">
          {log.map((entry, i) => (
            <p
              key={i}
              className="text-[0.6rem] md:text-lg lg:text-xl text-[var(--terminal-text)]"
            >
              {entry}
            </p>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full px-2 pb-1">
        <TerminalTypewriter word={onWordHover ?? ""} />
      </div>
    </div>
  );
}

export default TerminalLog;
