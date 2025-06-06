"use client";

import { useCrtMode } from "@/components/navbar/hooks/useCrtMode";
import { Button } from "@/components/ui/button";
import { TvIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGlowClass } from "./hooks/useGlowClass";

function CrtMode() {
  const { toggle, isEnabled, resolvedTheme } = useCrtMode();

  const glowClass = useGlowClass(isEnabled);

  if (resolvedTheme === "dark") {
    return (
      <Button
        onClick={toggle}
        size="icon"
        variant="outline"
        aria-pressed={isEnabled}
        aria-label="Toggle CRT Mode"
        className={cn(glowClass)}
      >
        <span className="sr-only">CRT Mode Toggle</span>
        <TvIcon />
      </Button>
    );
  }

  return null;
}

export default CrtMode;
