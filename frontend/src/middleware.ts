import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";


// export default async function auth(req: NextRequest) {
//     const token = await getToken({ req, secret: process.env.AUTH_SECRET });
//     const baseUrl = req.nextUrl.origin;

//     // Check if the user is authenticated
//     if (token && Date.now() >= token.data.validity.refresh_until * 1000) {
//       // Redirect to the login page
//       const response = NextResponse.redirect(`${baseUrl}/api/auth/signin`);
//       // Clear the session cookies
//       response.cookies.set("authjs.session-token", "", { maxAge: 0 });
//       response.cookies.set("authjs.csrf-token", "", { maxAge: 0 });

//       return response;
//     }

//     // If authenticated, continue with the request
//     return NextResponse.next();
//   }



import NextAuth from "next-auth";


import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
} from "@/routes";

const BACKEND_ACCESS_TOKEN_LIFETIME = 3600; // Example: 1 hour in seconds

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};


const isLoggedIn = async (req: NextRequest) => {
  const refreshToken = req.cookies.get('auth_refresh_token')?.value;
  if (!refreshToken) {
    return false;
  }

  try {
    console.log("BACKEND SECRET: ", process.env.BACKEND_SECRET);
    const payload = await jose.decodeJwt(refreshToken)
    console.log({ payload });

    if (payload.exp < getCurrentEpochTime()) {
      console.log("Refresh token expired");
      return false;
    }
    console.log("Refresh token is valid");
    return true;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return false;
  }
};

 
export async function middleware(request: NextRequest) {
  const {nextUrl} = request
  const loggedIn = await isLoggedIn(request)

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
      return NextResponse.next();
    }
  
    if (isAuthRoute) {
      console.log("ROUTE: ", nextUrl.pathname);

      try {
        if (loggedIn) {
          return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
      } catch (error) {
        console.log("Error checking if logged in: ", error);
      }
      
    }
  
    if (!loggedIn && !isPublicRoute && !isAuthRoute) {
      return NextResponse.redirect(new URL('/auth/login', nextUrl));
    }
  
    return NextResponse.next();
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        ],
}