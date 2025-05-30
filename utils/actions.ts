"use server";
import db from "@/utils//db";
import { redirect } from "next/navigation";
import { getAuthUser } from "./authUser";
import { renderError } from "./renderError";
import { productSchema } from "./schemas";
import { validateZodSchema } from "./validateZodSchema";

//* Fetches featured products from the database.
export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
  });
  return products;
};

//* Fetches all products from the database with optional search functionality.
export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  return db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

//* Fetches a single product by its ID from the database.
export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/products");
  return product;
};

//* Creates a new product in the database(from the admin panel).
export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    //* Easier approach to validate the form data using Zod schema.
    // const validatedFields = productSchema.parse(rawData);
    //* If we need custom error messages, we use `safeParse` instead of `parse`.
    //* Here, we are using custom helper function `validateZodSchema` to validate the data.

    const validatedFields = validateZodSchema(productSchema, rawData);

    await db.product.create({
      data: {
        ...validatedFields,
        image: "/images/product3.jpg",
        clerkId: user.id,
      },
    });

    // await db.product.create({
    //   data: {
    //     name,
    //     company,
    //     price,
    //     image: "/images/product1.jpg",
    //     description,
    //     featured,
    //     clerkId: user.id,
    //   },
    // });

    return { message: "Product created!" };
  } catch (error) {
    return renderError(error);
  }
};
