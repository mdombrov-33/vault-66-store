"use client";

import { useCrtMode } from "@/components/navbar/hooks/useCrtMode";
import { Button } from "../ui/button";
import { MonitorIcon } from "lucide-react";

function CrtMode() {
  const { toggle, isEnabled } = useCrtMode();

  return (
    <Button onClick={toggle} size="icon">
      <span className="sr-only">CRT Mode Toggle</span>
      <MonitorIcon className={isEnabled ? "text-green-400" : undefined} />
    </Button>
  );
}

export default CrtMode;
