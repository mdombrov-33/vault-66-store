"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormSpecialProps } from "@/types/form";
import { Minus, Plus } from "lucide-react";

function SpecialInput({ name, label, min = 1, max = 10 }: FormSpecialProps) {
  const [value, setValue] = useState(1);

  const decrement = () => setValue((v) => Math.max(min, v - 1));
  const increment = () => setValue((v) => Math.min(max, v + 1));

  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
      <label
        htmlFor={name}
        className="w-28 text-lg sm:w-32 sm:text-3xl uppercase text-muted-foreground"
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
        className="w-12 sm:w-16 aspect-square text-center text-lg sm:text-2xl leading-none rounded-full border border-primary bg-transparent"
      />

      <Button type="button" variant="ghost" onClick={increment}>
        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
}

export default SpecialInput;
