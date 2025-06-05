"use client";

import { useCrtMode } from "@/components/navbar/hooks/useCrtMode";
import { Button } from "../ui/button";
import { MonitorIcon } from "lucide-react";

function CrtMode() {
  const { toggle, isEnabled, isDarkMode } = useCrtMode();

  // Only render the button if dark mode is active
  if (!isDarkMode) return null;

  return (
    <Button
      onClick={toggle}
      size="icon"
      variant={isEnabled ? "default" : "outline"}
      aria-pressed={isEnabled}
      aria-label="Toggle CRT Mode"
    >
      <span className="sr-only">CRT Mode Toggle</span>
      <MonitorIcon />
    </Button>
  );
}

export default CrtMode;
