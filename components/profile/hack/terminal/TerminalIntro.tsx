// import { TerminalIntroProps } from "@/types/profile";

import { TerminalIntroProps } from "@/types/profile";

const TerminalIntro = ({ attemptsLeft }: TerminalIntroProps) => {
  const maxAttempts = 4;
  const blocks = Array.from({ length: maxAttempts }, (_, i) =>
    i < attemptsLeft ? "▮" : "▯"
  ).join(" ");

  return (
    <div className="text-primary text-sm sm:text-xl font-mono space-y-1">
      <div>
        <h1>ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL</h1>
      </div>
      <h3>WELCOME TO ROBCO INDUSTRIES (TM)</h3>
      <p>PASSWORD REQUIRED</p>
      <p>ATTEMPTS REMAINING: {blocks}</p>
    </div>
  );
};

export default TerminalIntro;
