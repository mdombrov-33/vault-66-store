'use client'

import { Card } from '@/components/ui/card'
import { FirstColumn, SecondColumn, FourthColumn } from '@/components/supply-bin/CartItemColumns'
import ThirdColumn from '@/components/supply-bin/ThirdColumn'
import { CartItemWithProduct } from '@/types/cart'

function CartItemsList({ cartItems }: { cartItems: CartItemWithProduct[] }) {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id: cartItemId, amount } = cartItem
        const { image, name, company, price, id: productId } = cartItem.product

        return (
          <Card
            key={cartItemId}
            className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
          >
            <FirstColumn image={image} name={name} />
            <SecondColumn productId={productId} name={name} company={company} />
            <ThirdColumn cartItemId={cartItemId} quantity={amount} />
            <FourthColumn price={price} />
          </Card>
        )
      })}
    </div>
  )
}

export default CartItemsList
