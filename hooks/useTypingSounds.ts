import { useRef } from "react";
import {
  typingSoundsSrc,
  enterSoundSrc,
  spacebarSoundSrc,
} from "@/data/sounds/typing-sounds";

//* Typing sounds for chat and nav search
export function useTypingSounds() {
  const soundIndex = useRef(0);
  const enterSound = useRef(new Audio(enterSoundSrc));
  const spacebarSound = useRef(new Audio(spacebarSoundSrc));

  function playTypingSound() {
    const audio = new Audio(typingSoundsSrc[soundIndex.current]);
    audio.volume = 0.4;
    audio.play();

    soundIndex.current = (soundIndex.current + 1) % typingSoundsSrc.length;
  }

  function playEnterSound() {
    enterSound.current.volume = 0.4;
    enterSound.current.currentTime = 0;
    enterSound.current.play();
  }

  function playSpacebarSound() {
    spacebarSound.current.volume = 0.4;
    spacebarSound.current.currentTime = 0;
    spacebarSound.current.play();
  }

  return { playTypingSound, playEnterSound, playSpacebarSound };
}
