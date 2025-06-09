import { useEffect, useState } from "react";

interface TerminalTypewriterProps {
  word: string | null | undefined;
  speed?: number;
}

export default function TerminalTypewriter({
  word,
  speed = 50,
}: TerminalTypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!word) {
      setDisplayedText("");
      return;
    }

    setDisplayedText("");
    let index = 0;

    const interval = setInterval(() => {
      if (index >= word.length) {
        clearInterval(interval);
        return;
      }
      const char = word[index];
      index++;
      setDisplayedText((prev) => prev + char);
    }, speed);

    return () => clearInterval(interval);
  }, [word, speed]);

  return (
    <p className="text-[0.6rem] md:text-lg lg:text-xl text-[var(--terminal-text)] flex items-center select-none">
      &gt; {displayedText}
      {word && word.length > 0 && (
        <span
          className="ml-1 text-[0.9rem]"
          style={{
            animation: "blink 1.7s steps(1, end) infinite",
          }}
        >
          ▇
        </span>
      )}
      <style jsx>{`
        @keyframes blink {
          0%,
          50%,
          100% {
            opacity: 1;
          }
          25%,
          75% {
            opacity: 0;
          }
        }
      `}</style>
    </p>
  );
}
