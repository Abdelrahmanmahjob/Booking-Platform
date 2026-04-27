import { NextRequest, NextResponse } from "next/server";

// Routes definitions
const AUTH_ROUTES = ["/login", "/register/client", "/register/provider"];
const CLIENT_ROUTES = ["/services"];
const PROVIDER_ROUTES = ["/provider"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const role = request.cookies.get("user_role")?.value;
  const { pathname } = request.nextUrl;

  const isLoggedIn = !!token;
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isClientRoute = CLIENT_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isProviderRoute = PROVIDER_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  // 1. لو في auth route وعنده token → روح للـ dashboard
  if (isAuthRoute && isLoggedIn) {
    if (role === "provider") {
      return NextResponse.redirect(new URL("/provider/dashboard", request.url));
    }
    return NextResponse.redirect(new URL("/services", request.url));
  }

  // 2. لو في protected route ومفيش token → روح للـ login
  if ((isClientRoute || isProviderRoute) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 3. لو client حاول يدخل provider routes
  if (isProviderRoute && role === "client") {
    return NextResponse.redirect(new URL("/services", request.url));
  }

  // 4. لو provider حاول يدخل client routes
  if (isClientRoute && role === "provider") {
    return NextResponse.redirect(new URL("/provider/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register/:path*",
    "/services/:path*",
    "/provider/:path*",
  ],
};
