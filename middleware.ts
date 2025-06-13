import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

//* This middleware protects routes using Clerk authentication.

//* It allows public access to specific routes(listed in the array) and protects all others.
const isPublicRoute = createRouteMatcher(['/', '/items(.*)', '/about', '/api/chat'])

//* It allows access to specific routes marked as admin routes.
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const userId = (await auth()).userId
  const isAdminUser = userId === process.env.ADMIN_USER_ID?.trim()
  const isTestAdminUser = userId === process.env.TEST_ADMIN_USER_ID?.trim()

  if (isAdminRoute(req) && !isAdminUser && !isTestAdminUser) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  if (!isPublicRoute(req)) await auth.protect()
})

//* Log current Clerk user ID. Another way to retrieve ID - get it from Users panel in Clerk dashboard.
// console.log((await auth()).userId);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
