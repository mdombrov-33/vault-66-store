import { useRef } from "react";
import { hackingHoverSrc, hackingClickSrc } from "@/data/sounds/hacking-sounds";

export function useHackingSounds() {
  const soundIndexHover = useRef(0);
  const soundIndexClick = useRef(0);

  function playHackingHoverSound() {
    const audio = new Audio(hackingHoverSrc[soundIndexHover.current]);
    audio.volume = 0.2;
    audio.play();

    soundIndexHover.current =
      (soundIndexHover.current + 1) % hackingHoverSrc.length;
  }

  function playHackingClickSound() {
    const audio = new Audio(hackingClickSrc[soundIndexClick.current]);
    audio.volume = 1;
    audio.play();

    soundIndexClick.current =
      (soundIndexClick.current + 1) % hackingClickSrc.length;
  }

  return { playHackingHoverSound, playHackingClickSound };
}
