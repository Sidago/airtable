import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/signin", "/signup", "/forgot-password"];

const protectedPaths = [
  "/", // home is protected
  "/calls-log",
  "/calls-log-beta",
  "/auto-call",
  "/leads-manual",
  "/dashboard",
  "/level-update",
  "/level-history",
  "/fix-lead",
  "/sms",
  "/email",
  "/blocked-email",
  "/add-company",
  "/update-company",
  "/leads",
  "/additional-contact",
  "/email-blacklist",
  "/dead-email",
  "/current-leads-svg",
  "/current-leads-benton",
  "/current-leads-95rm",
  "/unassigned-leads-svg",
  "/unassigned-leads-benton",
  "/unassigned-leads-95rm",
  "/recent-interest-svg",
  "/recent-interest-benton",
  "/recent-interest-95rm",
  "/ever-been-hot-svg",
  "/ever-been-hot-benton",
  "/ever-been-hot-95rm",
  "/leaderborad",
  "/monthly-status",
  "/closed-contact",
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const pathname = req.nextUrl.pathname;

  // Skip Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/assets")
  ) {
    return NextResponse.next();
  }

  // ✅ Logged in → block public pages
  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // ✅ Not logged in → block protected paths
  if (!token && protectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
