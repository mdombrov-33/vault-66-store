import { z } from "zod";
import { validateImageFile } from "./validateImageFile";

//* This schema is used to validate the product form data.
//* It ensures that the product name, company, price, description, and featured status are valid.
export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(100, {
      message: "Name must be less than 100 characters.",
    }),
  company: z.string(),
  //* Since we are getting featured as a string from the form, we use z.coerce.boolean() to convert it to a boolean.
  featured: z.coerce.boolean(),
  //* Since we are getting price as a string from the form, we use z.coerce.number() to convert it to a number.
  price: z.coerce.number().int().min(0, {
    message: "Price must be a positive number.",
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "Description must be between 10 and 1000 words.",
    }
  ),
});

//* This schema is used to separately validate images when creating a product.
export const imageSchema = z.object({
  image: validateImageFile(),
});

//* This schema is used to validate the review form data.
//* It ensures that the product ID, author name, author image URL, rating, and comment are valid.
export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== "", {
    message: "Product ID cannot be empty",
  }),
  authorName: z.string().refine((value) => value !== "", {
    message: "Author name cannot be empty",
  }),
  authorImageUrl: z.string().refine((value) => value !== "", {
    message: "Author image URL cannot be empty",
  }),
  //* Since we are getting rating as a string from the form, we use z.coerce.number() to convert it to a number.
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
  comment: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters long" })
    .max(1000, { message: "Comment must be at most 1000 characters long" }),
});
