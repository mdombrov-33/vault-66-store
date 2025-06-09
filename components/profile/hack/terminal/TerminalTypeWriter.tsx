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

  console.log(displayedText);

  return (
    <p className="text-[0.6rem] md:text-lg lg:text-xl text-[var(--terminal-text)]">{`> ${displayedText}`}</p>
  );
}
