/*
  By installing and importing the 'server-only' library, you make sure no one will be able to import and use
  any of the functions declared in this file on the client-side envrionment.
*/
import "server-only";

import { getLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { AUTH_TOKEN, JSON_HEADER } from "../constants/api.constant";
import { getAuthHeader, getLocaleHeader } from "../utils/get-headers";

/**
 * - This function is declared to fetch the products directly from the backend
 * It's use in any server-side component and will not be exposed to the client-side
 * - Alternativaly, you can fetch directly in your server-component if you're not going to fetch
 * the same endpoint again somewhere else
 * @returns {Promise<APIResponse<PaginatedResponse<Product[]>>>}
 */
export const getProducts = async () => {
  const locale = await getLocale();
  const token = cookies().get(AUTH_TOKEN)?.value;

  const response = await fetch(process.env.API + "/products", {
    next: { tags: ["products"] },
    headers: {
      ...JSON_HEADER,
      ...getLocaleHeader(locale),
      ...getAuthHeader(token),
    },
  });

  const payload: APIResponse<PaginatedResponse<Product[]>> = await response.json();

  return payload;
};
