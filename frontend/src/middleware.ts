import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
} from "@/routes";
import { UserCredentials } from "@/lib/auth/getUserCredentials";
import { getTokenExpiry } from "@/lib/auth/getTokenExpiry";

const checkAuth = async (req: NextRequest) => {
  let output = {
    loggedIn: false,
    refreshExpired: false,
    updateTokens: false,
    newTokens: {},
  };

  const cookieStore = await cookies();
  try {
    const tokens = cookieStore.get("authTokens")?.value;
    const userCredentials = JSON.parse(tokens as string) as UserCredentials;

    if (!userCredentials?.refresh) {
      output.loggedIn = false;
      return output;
    }

    const accessTokenExpires = new Date(userCredentials.accessTokenExpires);
    const refreshTokenExpires = new Date(userCredentials.refreshTokenExpires);

    console.log(
      "Access: ",
      accessTokenExpires.getTime() - new Date().getTime()
    );
    console.log(
      "Refresh: ",
      refreshTokenExpires.getTime() - new Date().getTime()
    );

    if (refreshTokenExpires.getTime() < new Date().getTime()) {
      console.log("Refresh token expired");
      output.loggedIn = false;
      output.refreshExpired = true;
      return output;
    }

    output.loggedIn = true;

    if (accessTokenExpires.getTime() < new Date().getTime()) {
      console.log("Access token expired");
      try {
        const response = await fetch(
          "http://localhost:8000/api/auth/token/refresh/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: userCredentials.refresh }),
          }
        );

        const output = response.json().then((data) => {
          const newTokens = {
            ...userCredentials,
            access: data.access,
            accessTokenExpires: getTokenExpiry("access"),
          };
          cookieStore.delete("authTokens");

          return {
            loggedIn: true,
            newTokens,
            updateTokens: true,
            refreshExpired: false,
          }
        });   

        return output;
      } catch (error) {
        console.error("Error refreshing access token: ", error);
        output.loggedIn = false;
        return output;
      }
    }

    return output;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    output.loggedIn = false;
    return output;
  }
};

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const authSummary = await checkAuth(request);
  const cookieStore = await cookies();

  const loggedIn = authSummary.loggedIn;

  if (authSummary.refreshExpired) {
    cookieStore.delete("authTokens");
    console.log("Redirecting to login page");
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }


  if (authSummary.updateTokens) {
    cookieStore.delete("authTokens");
    cookieStore.set("authTokens", JSON.stringify(authSummary.newTokens));
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
      if (loggedIn) {
        return NextResponse.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)
        );
      }
      return NextResponse.next();

    } catch (error) {
      console.log("Error checking if logged in: ", error);
    }
  }

  if (!loggedIn && !isPublicRoute && !isAuthRoute) {
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
