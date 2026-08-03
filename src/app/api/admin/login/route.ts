import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUsername = process.env.ADMIN_USERNAME || "admin";
    const expectedPassword = process.env.ADMIN_PASSWORD || "barbie_admin_2026";
    const secret = process.env.JWT_SECRET || "barbie_clinic_super_secret_jwt_key_2026";

    if (username === expectedUsername && password === expectedPassword) {
      // 1 day expiration
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
      const token = await signToken({ username, exp: expirationTime }, secret);

      const response = NextResponse.json({ success: true });
      response.cookies.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 24 * 60 * 60, // 1 day in seconds
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
