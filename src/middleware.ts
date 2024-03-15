import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = await getServerSession({ secret: process.env.JWT_SECRET, req });
  if (!token) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/myaccount", "/checkout", "/order", "/orders"],
};
