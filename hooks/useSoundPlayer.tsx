import { useRef } from "react";
import {
  globalHoverOrAnimationSrc,
  globalClickSrc,
} from "@/data/sounds/global-sounds";

//* Play click sound or hover sound on demand anywhere in the app
const getRandomSrc = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const useSoundPlayer = () => {
  const typingAudioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = (
    src: string,
    options?: { volume?: number; loop?: boolean }
  ) => {
    const audio = new Audio(src);
    audio.volume = options?.volume ?? 0.3;
    audio.loop = options?.loop ?? false;
    audio.play().catch((e) => console.warn("Sound play failed:", e));
    return audio;
  };

  const playClick = () => {
    const src = getRandomSrc(globalClickSrc);
    playSound(src, { volume: 0.25 });
  };

  const playHover = () => {
    const src = getRandomSrc(globalHoverOrAnimationSrc);
    playSound(src, { volume: 0.15 });
  };

  const playTypingLoop = () => {
    if (!typingAudioRef.current) {
      const src = getRandomSrc(globalHoverOrAnimationSrc);
      const audio = playSound(src, { volume: 0.2, loop: true });
      typingAudioRef.current = audio;
    }
  };

  const stopTypingLoop = () => {
    if (typingAudioRef.current) {
      typingAudioRef.current.pause();
      typingAudioRef.current.currentTime = 0;
      typingAudioRef.current = null;
    }
  };

  return {
    playClick,
    playHover,
    playTypingLoop,
    stopTypingLoop,
  };
};
