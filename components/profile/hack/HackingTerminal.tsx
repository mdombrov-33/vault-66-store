import { terminalLines } from "@/data/profile/hack/terminalLines";
import MemoryDump from "./MemoryDump";

export default function HackingTerminal() {
  return (
    <div className="bg-black text-primary flex items-start justify-center py-10 px-2 sm:py-20 sm:px-4">
      <div className="w-full min-h-[300px] sm:h-[500px] max-w-[700px] border border-primary p-3 sm:p-4 text-md sm:text-2xl overflow-hidden shadow-inner shadow-primary/20 bg-[#020202]">
        {terminalLines.map((line, index) => (
          <div key={index} className="whitespace-pre">
            {line}
          </div>
        ))}
        <div>
          <MemoryDump />
        </div>
      </div>
    </div>
  );
}
