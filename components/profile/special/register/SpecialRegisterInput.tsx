import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SpecialRegisterInputProps } from "@/types/profile";
import { cn } from "@/utils/cn";
import { Minus, Plus } from "lucide-react";

function SpecialRegisterInput({
  name,
  label,
  min = 1,
  max = 10,
  value,
  onIncrement,
  onDecrement,
  onHoverChange,
  hoveredStat,
}: SpecialRegisterInputProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 sm:gap-4 px-2",
        hoveredStat === name && "bg-primary/20 rounded-md"
      )}
      onMouseEnter={() => onHoverChange?.(name)}
      onMouseLeave={() => onHoverChange?.(null)}
    >
      <label
        htmlFor={name}
        className="w-28 text-2xl sm:w-32 sm:text-3xl uppercase text-muted-foreground"
      >
        <span className="text-primary">{label.charAt(0)}</span>
        {label.slice(1)}
      </label>

      <Button
        type="button"
        variant="ghost"
        onClick={() => onDecrement(name)}
        disabled={value <= min}
        aria-label={`Decrease ${name}`}
      >
        <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <Input
        type="number"
        name={name}
        id={name}
        readOnly
        value={value}
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-primary box-border px-1 text-center text-lg sm:text-2xl leading-none font-[roboto-mono] bg-transparent"
      />

      <Button
        type="button"
        variant="ghost"
        onClick={() => onIncrement(name)}
        disabled={value >= max}
        aria-label={`Increase ${name}`}
      >
        <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
}

export default SpecialRegisterInput;
