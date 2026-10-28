import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest, type NextFetchEvent } from "next/server";

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

// Handler for when Clerk keys are provided
const clerkHandler = clerkMiddleware(async (auth, req) => {
  const demoRole = req.cookies.get("hypergym_demo_role")?.value;

  if (demoRole === "ADMIN") {
    return NextResponse.next();
  }

  if (demoRole === "USER") {
    if (isAdminRoute(req)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  if (isAdminRoute(req) || isUserRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const hasClerkKeys = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
  );

  // If Clerk keys are not configured yet, use fallback mode so the app doesn't crash
  if (!hasClerkKeys) {
    const demoRole = req.cookies.get("hypergym_demo_role")?.value;

    if (demoRole === "USER" && req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  }

  return clerkHandler(req, event);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
