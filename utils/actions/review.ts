'use server'
import db from '@/lib/db'
import { getAuthUser } from '../auth/get-user'
import { validateZodSchema } from '../validation/validate-zod-schema'
import { reviewSchema } from '../validation/schemas'
import { renderError } from '../render-error'
import { revalidatePath } from 'next/cache'

//* Creates a new review for a product by the authenticated user.
export const createReviewAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser()

  try {
    const rawData = Object.fromEntries(formData)
    const validatedFields = validateZodSchema(reviewSchema, rawData)

    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    })

    revalidatePath(`/items/${validatedFields.productId}`)
    return { message: 'Review submitted' }
  } catch (error) {
    return renderError(error)
  }
}

//* Fetches all reviews for a specific product by its ID.
export const fetchProductReviews = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return reviews
}

//* Fetches the average rating for a product by its ID.
export const fetchProductRating = async (productId: string) => {
  const result = await db.review.groupBy({
    by: ['productId'],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  })
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  }
}

//* Fetches all reviews made by the authenticated user.
export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser()

  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  })

  return reviews
}

//* Deletes a review by its ID.
export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState
  const user = await getAuthUser()

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    })

    revalidatePath('/reviews')

    return { message: 'Review deleted' }
  } catch (error) {
    return renderError(error)
  }
}

//* Finds an existing review for a product by the authenticated user
//* (to restrict access to creating multiple reviews for the same product or prevent reviews from unsigned users).
export const findExistingReview = async (userId: string, productId: string) => {
  return db.review.findFirst({
    where: {
      clerkId: userId,
      productId: productId,
    },
  })
}
