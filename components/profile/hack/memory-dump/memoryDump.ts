const WORDS = [
  "TIGERS",
  "BOTTLE",
  "GLOBAL",
  "HUNTER",
  "ROCKET",
  "SYSTEM",
  "VAULTS",
  "PIRATE",
  "RADIO",
  "TERMINAL",
  "VAULT",
  "FALLOUT",
  "SOLDIER",
  "GAMER",
  "MUTANT",
  "CAPS",
];

function randomChar() {
  const chars = "}*%$>+@!^&#()&$#@!";
  return chars[Math.floor(Math.random() * chars.length)];
}

function embedWord(prefix: string, word: string, totalLength: number): string {
  const prefixLen = prefix.length;
  const wordLen = word.length;
  const maxOffset = totalLength - prefixLen - wordLen;
  const offset = Math.floor(Math.random() * maxOffset);

  let line = prefix;
  for (let i = 0; i < offset; i++) {
    line += randomChar();
  }
  line += [word];
  while (line.length < totalLength) {
    line += randomChar();
  }
  return line;
}

const TOTAL_LINE_LENGTH = 24;

export function generateLines() {
  const leftColumn: string[] = [];
  const rightColumn: string[] = [];
  const allWords: string[] = [];

  for (let i = 0; i < 20; i++) {
    const leftAddr =
      "0xF4" +
      (160 + i * 0x10).toString(16).toUpperCase().padStart(2, "0") +
      ": ";
    const rightAddr =
      "0xF4" +
      (168 + i * 0x10).toString(16).toUpperCase().padStart(2, "0") +
      ": ";

    const leftWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    const rightWord = WORDS[Math.floor(Math.random() * WORDS.length)];

    leftColumn.push(embedWord(leftAddr, leftWord, TOTAL_LINE_LENGTH));
    rightColumn.push(embedWord(rightAddr, rightWord, TOTAL_LINE_LENGTH));

    allWords.push(leftWord, rightWord);
  }

  return { leftColumn, rightColumn, allWords };
}

export function generateCombinedLines() {
  const { leftColumn, rightColumn } = generateLines();
  return leftColumn.map((left, i) => left + "   " + rightColumn[i]);
}
