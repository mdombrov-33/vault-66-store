'use server'
import db from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { getAuthUser } from '../auth/get-user'
import { revalidatePath } from 'next/cache'
import { renderError } from '../render-error'
import { Cart } from '@/lib/generated/prisma/client'

//* Fetches the number of items in the user's cart.
export const fetchCartItems = async () => {
  const { userId } = await auth()

  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? '',
    },
    select: {
      numItemsInCart: true,
    },
  })

  return cart?.numItemsInCart || 0
}

//* Adds a product to the user's cart.
export const addToCartAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string; srcUrl?: string }> => {
  const user = await getAuthUser()

  try {
    const productId = formData.get('productId') as string
    const amount = Number(formData.get('amount'))
    const product = await fetchProduct(productId)
    const cart = await fetchOrCreateCart({ userId: user.id })
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount })
    await updateCart(cart)

    revalidatePath(`/items/${productId}`)

    return {
      message: `[${product.name}] secured in supply bin.`,
      srcUrl: '/toaster/happy-condition.png',
    }
  } catch (error) {
    return renderError(error)
  }
}

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
}

//* Fetches the user's cart or creates a new one if it doesn't exist.
export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string
  errorOnFailure?: boolean
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  })
  if (!cart && errorOnFailure) {
    throw new Error('Cart not found')
  }
  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    })
  }

  return cart
}

//* Updates or creates a cart item in the user's cart.
const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string
  cartId: string
  amount: number
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  })
  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    })
  } else {
    cartItem = await db.cartItem.create({
      data: { amount, productId, cartId },
    })
  }
}

//* Updates the cart with the latest cart items and calculates totals.
export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })
  let numItemsInCart = 0
  let cartTotal = 0

  for (const item of cartItems) {
    numItemsInCart += item.amount
    cartTotal += item.amount * item.product.price
  }

  const tax = cart.taxRate * cartTotal
  const shipping = cartTotal ? cart.shipping : 0
  const orderTotal = cartTotal + tax + shipping

  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
    include: includeProductClause,
  })

  return { cartItems, currentCart }
}

//* Removes a cart item from the user's cart.
export const removeCartItemAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser()

  try {
    const cartItemId = formData.get('cartItemId') as string
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    })

    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    })

    await updateCart(cart)

    revalidatePath('/supply-bin')

    return { message: 'Item removed from bin' }
  } catch (error) {
    return renderError(error)
  }
}

//* Updates the quantity of a cart item in the user's cart.
export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number
  cartItemId: string
}): Promise<{ message: string; srcUrl?: string }> => {
  const user = await getAuthUser()

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    })

    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    })

    await updateCart(cart)

    revalidatePath('/supply-bin')

    return { message: 'Amount is updated', srcUrl: '/toaster/happy-condition.png' }
  } catch (error) {
    return renderError(error)
  }
}

//* Fetches a product by its ID to ensure it exists before adding it to the cart.
export const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) {
    throw new Error('Product not found')
  }

  return product
}
