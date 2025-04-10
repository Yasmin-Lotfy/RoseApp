"use server";

import { revalidateTag } from "next/cache";
import { JSON_HEADER } from "../constants/api.constant";
import { cookies } from "next/headers";

export const addProductAction = async (fields: { [key: string]: unknown }) => {
  const token = cookies().get("e-commerce_token")?.value;

  const response = await fetch(process.env.API + "/products", {
    method: "POST",
    body: JSON.stringify(fields),
    credentials: "include",
    headers: {
      ...JSON_HEADER,
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json();

  // Revalidate the cache of any fetch request that includes the { next: { tags: ['products'] } }
  revalidateTag("products");

  /*
    Alternatively, you can use revalidatePath() to revalidate the whole route
    ex: (if we are using internationalization)
        LOCALES.forEach(locale => revalidatePath(`/${locale}/products`))
        => This will revalidate `/ar/products` route and `/en/products` route
  */

  return payload;
};
