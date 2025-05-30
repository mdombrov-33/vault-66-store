import { z, ZodSchema } from "zod";

export const productSchema = z.object({
  name: z.string().min(4),
  company: z.string().min(4),
  //* Since we are getting price as a string from the form, we use z.coerce.number() to convert it to a number.
  price: z.coerce.number().int().min(0),
  description: z.string(),
  //* Since we are getting featured as a string from the form, we use z.coerce.boolean() to convert it to a boolean.
  featured: z.coerce.boolean(),
});
