import { leftColumn, rightColumn } from "@/data/profile/hack/memoryDump";

function MemoryDump() {
  return (
    <div className="grid grid-cols-2 gap-x-8 leading-tight text-primary text-sm md:text-2xl mt-6">
      <div>
        {leftColumn.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
      <div>
        {rightColumn.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}

export default MemoryDump;
