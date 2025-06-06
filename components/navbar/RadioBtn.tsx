"use client";

import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";

const radioUrl = "https://fallout.fm:8444/falloutfm1.ogg";

function RadioBtn() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const handleClick = () => {
    if (!isPlaying) {
      setIsLoading(true);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const isRadioPlaying = isPlaying && !isLoading;
  const isDarkTheme = theme === "dark";

  const glowClass = isRadioPlaying
    ? isDarkTheme
      ? "crt-glow-dark"
      : "crt-glow-light"
    : "";

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={handleClick}
        className={glowClass}
      >
        {isLoading ? <VscLoading className="animate-spin" /> : <Radio />}
        <span className="sr-only">Radio Station</span>
      </Button>

      {isPlaying && <audio src={radioUrl} autoPlay onPlaying={handleCanPlay} />}
    </>
  );
}

export default RadioBtn;
