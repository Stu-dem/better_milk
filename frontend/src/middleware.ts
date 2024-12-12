
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { NextResponse } from 'next/server';


import {
    DEFAULT_LOGIN_REDIRECT,
    publicRoutes,
    authRoutes,
    apiAuthPrefix,
} from "@/routes";

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const {nextUrl} = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return NextResponse.next();
      }
    
      if (isAuthRoute) {
        if (isLoggedIn) {
          return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
      }
    
      if (!isLoggedIn && !isPublicRoute) {
        return NextResponse.redirect(new URL('/auth/login', nextUrl));
      }
    
      return NextResponse.next();

})

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        ],
}