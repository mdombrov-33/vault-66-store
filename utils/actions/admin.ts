'use server'

import { redirect } from 'next/navigation'
import db from '@/lib/db'
import { renderError } from '@/utils/render-error'
import { deleteImage, uploadImage } from '@/lib/supabase'
import { validateZodSchema } from '@/utils/validation/validate-zod-schema'
import { getAuthorizedAdminUser, getAuthUser } from '@/utils/auth/get-user'
import { imageSchema, productSchema } from '@/utils/validation/schemas'
import { revalidatePath } from 'next/cache'

//* Creates a new product in the database(from the admin panel).
export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser()

  const isTestAdminUser = user.id === process.env.TEST_ADMIN_USER_ID?.trim()

  try {
    const rawData = Object.fromEntries(formData)
    const file = formData.get('image') as File
    //* Easier approach to validate the form data using Zod schema.
    // const validatedFields = productSchema.parse(rawData);
    //* If we need custom error messages, we use `safeParse` instead of `parse`.
    //* Here, we are using custom helper function `validateZodSchema` to validate the data.

    const validatedFields = validateZodSchema(productSchema, rawData)

    //* Don't pass the file directly, pass it as an object with the key `image`.
    //* If we pass it directly we will get an error: `image is not an instance of File`.
    const validatedFile = validateZodSchema(imageSchema, { image: file })
    const fullPath = await uploadImage(validatedFile.image)

    await db.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: user.id,
        isTestProduct: isTestAdminUser, //* Mark as test product if created by test admin
      },
    })
  } catch (error) {
    return renderError(error)
  }
  redirect('/admin/items')
}

//* Fetches all products(from the admin panel).
export const fetchAdminProducts = async () => {
  await getAuthorizedAdminUser()

  const products = await db.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return products
}

//* Deletes a product from the database (admin panel only).
//* The `productId` comes from `prevState`, which is passed in from the form submission.
//* `prevState` represents the latest form state and is manually passed using `.bind()` when setting up the action.
//* After deleting, we call `revalidatePath()` to refresh the admin products page cache and update the UI.
//* We also delete the image from the Supabase storage.
export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState

  const user = await getAuthorizedAdminUser()
  const testAdminId = process.env.TEST_ADMIN_USER_ID?.trim()

  try {
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      throw new Error('Item not found')
    }

    if (!product.isTestProduct && user.id === testAdminId) {
      throw new Error('You cannot delete an item created by the main admin')
    }

    await db.product.delete({
      where: {
        id: productId,
      },
    })

    await deleteImage(product.image)

    revalidatePath('/admin/items')

    return { message: 'Item deleted' }
  } catch (error) {
    return renderError(error)
  }
}

//* Fetches product details for the admin panel.
export const fetchAdminProductDetails = async (productId: string) => {
  await getAuthorizedAdminUser()

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  })

  if (!product) redirect('/admin/items')

  return product
}

//* Updates a product in the database (admin panel only).
//* After updating, we revalidate the path to refresh the product edit page cache and update the UI.
export const updateProductAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthorizedAdminUser()
  const testAdminId = process.env.TEST_ADMIN_USER_ID?.trim()

  try {
    const productId = formData.get('id') as string
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateZodSchema(productSchema, rawData)

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      throw new Error('Item not found')
    }

    if (!product.isTestProduct && user.id === testAdminId) {
      throw new Error('You cannot update an item created by the main admin')
    }

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    })

    revalidatePath(`/admin/items/${productId}/edit`)

    return { message: 'Item updated' }
  } catch (error) {
    return renderError(error)
  }
}

//* Updates a product image in the database (admin panel only).
//* After updating, we delete the old image from Supabase storage and revalidate the path to refresh the product edit page cache.
export const updateProductImageAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthorizedAdminUser()
  const testAdminId = process.env.TEST_ADMIN_USER_ID?.trim()

  try {
    const image = formData.get('image') as File
    const productId = formData.get('id') as string
    const oldImageUrl = formData.get('url') as string
    const validatedFile = validateZodSchema(imageSchema, { image })
    const fullPath = await uploadImage(validatedFile.image)

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product?.isTestProduct && user.id === testAdminId) {
      throw new Error('You cannot update an item created by the main admin')
    }

    await deleteImage(oldImageUrl)

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    })

    revalidatePath(`/admin/items/${productId}/edit`)

    return { message: 'Item image updated' }
  } catch (error) {
    return renderError(error)
  }
}

//* Fetches all orders for the admin panel.
export const fetchAdminOrders = async () => {
  await getAuthorizedAdminUser()

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return orders
}
