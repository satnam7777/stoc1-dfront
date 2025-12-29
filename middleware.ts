// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  console.log("🔍 Middleware - Path:", request.nextUrl.pathname, "Token:", token ? "exists" : "none");

  const isLoginPage = request.nextUrl.pathname === "/Authentication/signin";
  const isSignupPage = request.nextUrl.pathname === "/Authentication/signup";
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  // If trying to access dashboard without token → redirect to signin
  if (!token && isDashboard) {
    console.log("🚫 No token found, redirecting to signin");
    return NextResponse.redirect(new URL("/Authentication/signin", request.url));
  }

  // If has token and visiting login/signup → redirect to dashboard
  if (token && (isLoginPage || isSignupPage)) {
    console.log("✅ Token found, redirecting to dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/Authentication/signin", "/Authentication/signup"],
};
