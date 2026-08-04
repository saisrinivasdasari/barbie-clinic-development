import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Normalize pathname to remove trailing slash
  const cleanPath = pathname.replace(/\/$/, "");

  console.log(`[Proxy] Intercepted path: ${pathname} | Clean: ${cleanPath}`);

  // Skip check for login endpoints/pages
  if (cleanPath === "/admin-login" || cleanPath === "/api/admin/login") {
    return NextResponse.next();
  }

  // Get session cookie
  const token = request.cookies.get("admin_session")?.value;
  const secret = process.env.JWT_SECRET || "barbie_clinic_super_secret_jwt_key_2026";

  const verified = token ? await verifyToken(token, secret) : null;

  if (!verified) {
    // If it's an API route, return 401
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    // Otherwise redirect to login page
    const loginUrl = new URL("/admin-login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*"
  ],
};
