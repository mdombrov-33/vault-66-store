"use client";

import { useCrtMode } from "@/components/navbar/hooks/useCrtMode";
import { Button } from "@/components/ui/button";
import { TvIcon } from "lucide-react";

function CrtMode() {
  const { toggle, isEnabled, isDarkMode } = useCrtMode();

  if (!isDarkMode) return null;

  return (
    <Button
      onClick={toggle}
      size="icon"
      variant="outline"
      aria-pressed={isEnabled}
      aria-label="Toggle CRT Mode"
      className={
        isEnabled ? (isDarkMode ? "crt-glow-dark" : "crt-glow-light") : ""
      }
    >
      <span className="sr-only">CRT Mode Toggle</span>
      <TvIcon />
    </Button>
  );
}

export default CrtMode;
