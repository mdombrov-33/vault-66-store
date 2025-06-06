"use server";

import db from "@/lib/db";
import { getAuthUser } from "../auth/get-user";
import { revalidatePath } from "next/cache";
import { renderError } from "../render-error";

//* Fetches the favorite ID for a product by its ID for the authenticated user.
export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();

  const favorite = await db.favorite.findFirst({
    where: {
      productId: productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  });

  return favorite?.id || null;
};

//* Toggles the favorite status of a product for the authenticated user.
//* If the product is already favorited, it removes it; otherwise, it adds it.
export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathName: string;
}) => {
  const user = await getAuthUser();
  const { productId, favoriteId, pathName } = prevState;

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      name: true,
    },
  });

  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
    }

    revalidatePath(pathName);

    return {
      message: favoriteId
        ? `${product?.name} is removed from favorites`
        : `${product?.name} is added to favorites`,
    };
  } catch (error) {
    return renderError(error);
  }
};

//* Fetches all favorite products for the authenticated user.
export const fetchUserFavorites = async () => {
  const user = await getAuthUser();

  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true, // Include product details in the response
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return favorites;
};
