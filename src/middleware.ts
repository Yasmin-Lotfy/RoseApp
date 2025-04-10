import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { LOCALES, routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const authPages = ["/auth/login", "/auth/register"];
// Remove /about-us from public pages to make it protected
const publicPages = [
  "/",
  "/store-location",
  "/contact",
  "/delivery",
  "/categories",
  "/policy",
  "/faqs",
  ...authPages,
];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/auth/login",
      error: "/auth/login",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const publicPathRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})(/.*)?/?$`,
    "i"
  );

  const authPathRegex = RegExp(
    `^(/(${LOCALES.join("|")}))?(${authPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );

  const isPublicPage = publicPathRegex.test(req.nextUrl.pathname);
  const isAuthPage = authPathRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    if (token && isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }
    return handleI18nRouting(req);
  } else {
    if (!token) {
      // Redirect to login page with callbackUrl parameter
      const signInUrl = new URL("/auth/login", req.nextUrl.origin);
      signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname); // Set the callbackUrl to redirect back after login
      return NextResponse.redirect(signInUrl);
    }

    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};