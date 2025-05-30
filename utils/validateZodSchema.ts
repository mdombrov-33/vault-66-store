import { ZodSchema } from "zod";

//* This helper function validates Zod schemas.
//* It takes a Zod schema and data, and returns the validated data or throws an error if validation fails.
export function validateZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(" "));
  }
  return result.data;
}
