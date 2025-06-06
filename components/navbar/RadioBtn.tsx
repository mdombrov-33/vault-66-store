"use client";

import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";
import { cn } from "@/lib/utils";
import { useGlowClass } from "./hooks/useGlowClass";

const RADIO_SOURCE = "https://fallout.fm:8444/falloutfm1.ogg";

function RadioBtn() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  const glowClass = useGlowClass(isRadioPlaying);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={handleClick}
        className={cn(glowClass)}
        aria-pressed={isRadioPlaying}
        aria-label="Toggle Radio"
      >
        {isLoading ? <VscLoading className="animate-spin" /> : <Radio />}
      </Button>

      {isPlaying && (
        <audio
          src={RADIO_SOURCE}
          autoPlay
          onPlaying={handleCanPlay}
          onError={() => {
            setIsPlaying(false);
            setIsLoading(false);
          }}
        />
      )}
    </>
  );
}

export default RadioBtn;
