"use client";

import { useCrtMode } from "@/components/navbar/hooks/useCrtMode";
import { Button } from "@/components/ui/button";
import { TvIcon } from "lucide-react";
import { useEffect, useState } from "react";

function CrtMode() {
  const { toggle, isEnabled, isDarkMode } = useCrtMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (!isDarkMode) return null;

  if (!mounted)
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
