// @ts-nocheck
// import { auth } from "@/auth"
// ! 2h 22

import authConfig  from "@/auth.config"
import NextAuth from "next-auth";
import { defaultLoginRedirect, apiAuthPrefix, authRoutes, publicRoutes } from "./route";

const { auth } = NextAuth(authConfig)



export default auth((req) => {
  // ! we write a code and choose when to apply it like in login, sign up page
  // console.log(req.nextUrl.pathname)
  // const isLoggedIn = !!req.auth;
  // console.log(isLoggedIn)
  // we are to use that to protect the routes, you can manually write evert route inside

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute =  publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute =  authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return null;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(defaultLoginRedirect, nextUrl))
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callBackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callBackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callBackUrl)

    // return Response.redirect(new URL(`auth/login`, nextUrl))
    return Response.redirect(new URL(`auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }
  return null; // allow every other routes

}) 

// Optionally, don't invoke Middleware on some paths
export const config = {
    // matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    // matcher: ["/auth/login", "auth/register"],
    // ! this is the best regex so it would apply on every page
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],

}