"use client";

import { Button } from "@/components/ui/button";
import { Radio } from "lucide-react";
import { useState } from "react";
import { VscLoading } from "react-icons/vsc";

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
        variant={isPlaying && !isLoading ? "default" : "outline"}
        size="icon"
        onClick={handleClick}
      >
        {isLoading ? <VscLoading className="animate-spin" /> : <Radio />}
        <span className="sr-only">Radio Station</span>
      </Button>

      {isPlaying && <audio src={radioUrl} autoPlay onPlaying={handleCanPlay} />}
    </>
  );
}

export default RadioBtn;
