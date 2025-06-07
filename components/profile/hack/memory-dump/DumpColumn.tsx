import { DumpColumnProps } from "@/types/profile";

function DumpColumn({ lines }: DumpColumnProps) {
  return (
    <div>
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}

export default DumpColumn;
