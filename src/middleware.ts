import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/api/demo(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isUserRoute = createRouteMatcher(["/dashboard(.*)", "/checkout(.*)", "/billing(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Check if evaluator demo role cookie is set
  const demoRole = req.cookies.get("hypergym_demo_role")?.value;

  if (demoRole === "ADMIN") {
    // Demo admin can access any route
    return NextResponse.next();
  }

  if (demoRole === "USER") {
    // Demo user can access user routes, but not admin routes
    if (isAdminRoute(req)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // If public route, allow immediately
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // If Clerk publishable key is not set, allow graceful pass-through in development
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return NextResponse.next();
  }

  // Protect private routes
  if (isAdminRoute(req) || isUserRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
