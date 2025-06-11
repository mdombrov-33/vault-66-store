import React from "react";

interface HackingGameBaseProps {
  onGuess: (word: string) => boolean;
  gameOver: boolean;
  log: string[];
}

interface HackingHoverProps {
  onWordHover: string | null;
  setOnWordHover: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface MemoryDumpGridProps
  extends HackingGameBaseProps,
    HackingHoverProps {
  leftColumn: string[];
  rightColumn: string[];
}

export interface TerminalIntroProps
  extends Pick<HackingHoverProps, "setOnWordHover"> {
  attemptsLeft: number;
  resetGame: () => void;
  setIsIntroDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ResetBtnProps = Pick<
  TerminalIntroProps,
  "resetGame" | "setOnWordHover"
>;

export interface DumpColumnProps
  extends Omit<HackingGameBaseProps, "log">,
    Pick<HackingHoverProps, "setOnWordHover"> {
  lines: string[];
}
export interface LineWithClickableWordsProps
  extends Omit<HackingGameBaseProps, "log">,
    Pick<HackingHoverProps, "setOnWordHover"> {
  line: string;
}

export interface TerminalLogProps
  extends Pick<HackingGameBaseProps, "log" | "gameOver"> {
  onWordHover: string | null;
}
