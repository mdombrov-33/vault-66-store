import { Input } from '@/components/ui/input'
import { SpecialResultStatProps } from '@/types/profile'

function SpecialResultInput({ name, label, value }: SpecialResultStatProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-2">
      <label htmlFor={name} className="w-28 text-3xl uppercase text-muted-foreground">
        <span className="text-primary">{label.charAt(0)}</span>
        {label.slice(1)}
      </label>

      <div className="w-14 h-14 rounded-full border border-primary ml-16 flex items-center justify-center">
        <Input
          type="number"
          name={name}
          id={name}
          readOnly
          value={value}
          className="w-14 h-14  rounded-full border border-primary box-border px-1 text-center text-lg sm:text-2xl leading-none font-[roboto-mono] bg-transparent focus:outline-none focus:ring-0 focus-visible:ring-0 ring-0 outline-none"
        />
      </div>
    </div>
  )
}

export default SpecialResultInput
