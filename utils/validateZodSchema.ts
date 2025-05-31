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

//* If we need better log messages for toast notifications(`name` in forms does not match the Zod schema, for example, and we missed it),
//* Instead this line:
// const errors = result.error.errors.map((error) => error.message);

//* Use this:
//  const errors = result.error.errors.map(
//   (error) => `${error.path.join(".")}: ${error.message}`
// );
