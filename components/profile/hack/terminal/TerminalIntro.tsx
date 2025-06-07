import { useState } from "react";
import { TerminalIntroProps } from "@/types/profile";
import { TypeAnimation } from "react-type-animation";

const MAX_ATTEMPTS = 5;

const TerminalIntro = ({ attemptsLeft }: TerminalIntroProps) => {
  const [animationDone, setAnimationDone] = useState(false);

  const blocks = Array.from({ length: MAX_ATTEMPTS }, (_, i) =>
    i < attemptsLeft ? "▮" : "▯"
  ).join(" ");

  return (
    <section
      aria-label="Terminal introduction"
      className="text-primary text-sm sm:text-xl font-mono space-y-1 bg-black p-4 rounded"
    >
      <h1 className="sr-only">Terminal Intro</h1>

      {!animationDone ? (
        <TypeAnimation
          sequence={[
            "ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL\n",
            0,
            "ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL\nWELCOME TO ROBCO INDUSTRIES (TM)\n",
            0,
            "ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL\nWELCOME TO ROBCO INDUSTRIES (TM)\nPASSWORD REQUIRED\n",
            0,
            `ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL\nWELCOME TO ROBCO INDUSTRIES (TM)\nPASSWORD REQUIRED\nATTEMPTS REMAINING: ${blocks}`,
            () => {
              setAnimationDone(true);
            },
          ]}
          repeat={0}
          speed={85}
          cursor={false}
          className="whitespace-pre-wrap"
        />
      ) : (
        <pre className="whitespace-pre-wrap">
          ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL
          {"\n"}WELCOME TO ROBCO INDUSTRIES (TM)
          {"\n"}PASSWORD REQUIRED
          {"\n"}ATTEMPTS REMAINING: {blocks}
        </pre>
      )}
    </section>
  );
};

export default TerminalIntro;
