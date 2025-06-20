import { z } from 'zod'
import { validateImageFile } from '@/utils/validation/validate-image-file'

//* This schema is used to validate the product form data.
//* It ensures that the product name, company, price, description, and featured status are valid.
export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(100, {
      message: 'Name must be less than 100 characters.',
    }),
  company: z.string(),
  //* Since we are getting featured as a string from the form, we use z.coerce.boolean() to convert it to a boolean.
  featured: z.coerce.boolean(),
  //* Since we are getting price as a string from the form, we use z.coerce.number() to convert it to a number.
  price: z.coerce.number().int().min(0, {
    message: 'Price must be a positive number.',
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length
      return wordCount >= 10 && wordCount <= 1000
    },
    {
      message: 'Description must be between 10 and 1000 words.',
    }
  ),
})

//* This schema is used to separately validate images when creating a product.
export const imageSchema = z.object({
  image: validateImageFile(),
})

//* This schema is used to validate the review form data.
//* It ensures that the product ID, author name, author image URL, rating, and comment are valid.
export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== '', {
    message: 'Product ID cannot be empty',
  }),
  authorName: z.string().refine((value) => value !== '', {
    message: 'Author name cannot be empty',
  }),
  authorImageUrl: z.string().refine((value) => value !== '', {
    message: 'Author image URL cannot be empty',
  }),
  //* Since we are getting rating as a string from the form, we use z.coerce.number() to convert it to a number.
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: 'Rating must be at least 1' })
    .max(5, { message: 'Rating must be at most 5' }),
  comment: z
    .string()
    .min(5, { message: 'Comment must be at least 5 characters long' })
    .max(2000, { message: 'Comment must be at most 2000 characters long' }),
})

//* This schema is used to validate user's special attributes.
export const specialSchema = z
  .object({
    strength: z.coerce
      .number()
      .int()
      .min(1, { message: 'Strength must be at least 1.' })
      .max(10, { message: 'Strength cannot exceed 10.' }),
    perception: z.coerce
      .number()
      .int()
      .min(1, { message: 'Perception must be at least 1.' })
      .max(10, { message: 'Perception cannot exceed 10.' }),
    endurance: z.coerce
      .number()
      .int()
      .min(1, { message: 'Endurance must be at least 1.' })
      .max(10, { message: 'Endurance cannot exceed 10.' }),
    charisma: z.coerce
      .number()
      .int()
      .min(1, { message: 'Charisma must be at least 1.' })
      .max(10, { message: 'Charisma cannot exceed 10.' }),
    intelligence: z.coerce
      .number()
      .int()
      .min(1, { message: 'Intelligence must be at least 1.' })
      .max(10, { message: 'Intelligence cannot exceed 10.' }),
    agility: z.coerce
      .number()
      .int()
      .min(1, { message: 'Agility must be at least 1.' })
      .max(10, { message: 'Agility cannot exceed 10.' }),
    luck: z.coerce
      .number()
      .int()
      .min(1, { message: 'Luck must be at least 1.' })
      .max(10, { message: 'Luck cannot exceed 10.' }),
  })
  .refine(
    (data) => {
      const basePoints = 7
      const allocated =
        data.strength +
        data.perception +
        data.endurance +
        data.charisma +
        data.intelligence +
        data.agility +
        data.luck -
        basePoints
      return allocated <= 21
    },
    {
      message: 'You can only allocate 21 points above the base value of 7',
    }
  )

//* This schema is used to validate user's skills.

export const skillSchema = z.object({
  barter: z.coerce.number().int().min(0).max(100),
  bigGuns: z.coerce.number().int().min(0).max(100),
  energyWeapons: z.coerce.number().int().min(0).max(100),
  explosives: z.coerce.number().int().min(0).max(100),
  lockpick: z.coerce.number().int().min(0).max(100),
  medicine: z.coerce.number().int().min(0).max(100),
  meleeWeapons: z.coerce.number().int().min(0).max(100),
  repair: z.coerce.number().int().min(0).max(100),
  science: z.coerce.number().int().min(0).max(100),
  sneak: z.coerce.number().int().min(0).max(100),
  speech: z.coerce.number().int().min(0).max(100),
  smallGuns: z.coerce.number().int().min(0).max(100),
  unarmed: z.coerce.number().int().min(0).max(100),
  survival: z.coerce.number().int().min(0).max(100),
})
