import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FormInputNumberProps } from '@/types/form'

// import { Prisma } from "@/lib/generated/prisma"; //Grab Prisma field instead of hardcoding
// Prisma.ProductScalarFieldEnum.price
const name = 'price'

function PriceInput({ defaultValue }: FormInputNumberProps) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize text-xl">
        Price (Caps)
      </Label>
      <Input
        id={name}
        type="number"
        name={name}
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  )
}

export default PriceInput
