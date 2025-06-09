import { useEffect, useState } from "react";
import { TerminalIntroProps } from "@/types/profile";
import { TypeAnimation } from "react-type-animation";
import ResetBtn from "./ResetBtn";
import { useSoundPlayer } from "@/hooks/useSoundPlayer";

const MAX_ATTEMPTS = 4;

const TerminalIntro = ({
  attemptsLeft,
  resetGame,
  setOnWordHover,
}: TerminalIntroProps) => {
  const [animationDone, setAnimationDone] = useState(false);
  const { playTypingLoop, stopTypingLoop } = useSoundPlayer();

  const blocks = Array.from({ length: MAX_ATTEMPTS }, (_, i) =>
    i < attemptsLeft ? "▮" : "▯"
  ).join(" ");

  useEffect(() => {
    if (!animationDone) {
      playTypingLoop();
    } else {
      stopTypingLoop();
    }
  }, [animationDone, playTypingLoop, stopTypingLoop]);

  return (
    <section
      aria-label="Terminal introduction"
      className="text-primary text-[0.6rem] md:text-md lg:text-xl font-mono p-4 rounded grid grid-cols-[1fr_auto] items-center gap-4"
    >
      <h1 className="sr-only">Terminal Intro</h1>

      {/* Left: terminal text */}
      <div>
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
            speed={95}
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
      </div>

      {/* Right: retry button */}
      {attemptsLeft === 0 && (
        <ResetBtn setOnWordHover={setOnWordHover} resetGame={resetGame} />
      )}
    </section>
  );
};

export default TerminalIntro;
