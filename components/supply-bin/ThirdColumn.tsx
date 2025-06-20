'use client'
import { useState } from 'react'
import SelectProductAmount from '@/components/single-item/SelectProductAmount'
import { Mode } from '@/types/enums'
import FormContainer from '@/components/form/FormContainer'
import { SubmitButton } from '@/components/form/Buttons'
import { removeCartItemAction, updateCartItemAction } from '@/utils/actions/cart'
import { toast } from 'sonner'
import { useSoundPlayer } from '@/hooks/useSoundPlayer'
import { showToast } from '@/utils/show-toast'

function ThirdColumn({ quantity, cartItemId }: { quantity: number; cartItemId: string }) {
  const [amount, setAmount] = useState(quantity)
  const [isLoading, setIsLoading] = useState(false)
  const { playClick } = useSoundPlayer()

  const handleAmountChange = async (value: number) => {
    setIsLoading(true)

    const toastId = toast.loading('Processing inventory update...')

    const result = await updateCartItemAction({
      amount: value,
      cartItemId,
    })

    setAmount(value)

    showToast(result.message, result.srcUrl)
    toast.dismiss(toastId)

    setIsLoading(false)
  }

  return (
    <div className="md:ml-8">
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={isLoading}
      />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="cartItemId" value={cartItemId} />
        <SubmitButton
          size="sm"
          className="mt-4 text-2xl"
          text="remove"
          onClick={() => playClick()}
        />
      </FormContainer>
    </div>
  )
}

export default ThirdColumn
