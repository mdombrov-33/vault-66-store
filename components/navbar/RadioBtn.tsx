"use client";

import { Button } from "@/components/ui/button";
import { Radio, Loader } from "lucide-react";
import { useState } from "react";

const radioUrl = "https://fallout.fm:8444/falloutfm1.ogg";

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

  //* fired when audio is ready to play
  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Button
        variant={isPlaying ? "default" : "outline"}
        size="icon"
        onClick={handleClick}
      >
        {isLoading ? (
          <Loader className="h-5 w-5 animate-spin" />
        ) : (
          <Radio className="h-5 w-5" />
        )}
        <span className="sr-only">Radio Station</span>
      </Button>

      {isPlaying && <audio src={radioUrl} autoPlay onPlaying={handleCanPlay} />}
    </>
  );
}

export default RadioBtn;
