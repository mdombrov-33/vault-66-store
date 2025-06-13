'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { CheckboxInputProps } from '@/types/form'

function CheckboxInput({ name, label, defaultChecked = false }: CheckboxInputProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={name} name={name} defaultChecked={defaultChecked} />
      <label
        htmlFor={name}
        className="text-xl leading-none capitalize peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}

export default CheckboxInput
