import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "@/routes";

import { refreshTokens } from "./lib/auth/refreshToken";
import { checkTokens } from "./lib/auth/checkTokens";
import { getTokens, updateTokens } from "./lib/auth/manageTokensServer";

// Runs on every redirect within client
export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const userCredentials = await getTokens();
  const authSummary = await checkTokens(userCredentials);
  const cookieStore = await cookies();

  if (authSummary.refreshExpired) {
    cookieStore.delete("authTokens");
    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  if (authSummary.updateTokens) {
    const newTokens = await refreshTokens(userCredentials);
    await updateTokens(userCredentials, newTokens);
  }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    console.log("ROUTE: ", nextUrl.pathname);

    try {
      if (authSummary.loggedIn) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return NextResponse.next();
    } catch (error) {
      console.log("Error checking if logged in: ", error);
    }
  }

  if (!authSummary.loggedIn && !isPublicRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
