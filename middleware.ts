import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

//* This middleware protects routes using Clerk authentication.
//* It allows public access to specific routes(listed in the array) and protects all others.

const isPublicRoute = createRouteMatcher(["/", "/products(.*)", "/about"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
