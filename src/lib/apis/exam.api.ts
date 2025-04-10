import "server-only";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { AUTH_COOKIE } from "../constants/auth.constant";

export async function fetchExams() {
  const tokenCookies = cookies().get(AUTH_COOKIE)?.value;
  const token = await decode({ token: tokenCookies, secret: process.env.NEXTAUTH_SECRET! });

  const response = await fetch(process.env.API + "/exams", {
    headers: {
      token: token?.token || "",
    },
  });

  const payload: APIResponse<PaginatedResponse<unknown[]>> = await response.json();

  if ("code" in payload) {
    return null;
  }

  return payload;
}
