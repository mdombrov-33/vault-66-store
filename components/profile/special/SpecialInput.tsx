"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormSpecialInput } from "@/types/form";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

function SpecialInput({
  name,
  label,
  min = 1,
  max = 10,
  onHoverChange,
  hoveredStat,
}: FormSpecialInput) {
  const [value, setValue] = useState(1);

  const decrement = () => setValue((v) => Math.max(min, v - 1));
  const increment = () => setValue((v) => Math.min(max, v + 1));

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 sm:gap-4 px-4",
        hoveredStat === name && "bg-primary/20 rounded-md"
      )}
      onMouseEnter={() => onHoverChange?.(name)}
      onMouseLeave={() => onHoverChange?.(null)}
    >
      <label
        htmlFor={name}
        className="w-28 text-2xl sm:w-32 sm:text-3xl uppercase text-muted-foreground "
      >
        <span className="text-primary">{label.charAt(0)}</span>
        {label.slice(1)}
      </label>

      <Button type="button" variant="ghost" onClick={decrement}>
        <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <Input
        type="number"
        name={name}
        id={name}
        readOnly
        value={value}
        className={cn(
          "w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-primary box-border px-1 text-center text-lg sm:text-2xl leading-none font-mono bg-transparent"
        )}
      />

      <Button type="button" variant="ghost" onClick={increment}>
        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
}

export default SpecialInput;
