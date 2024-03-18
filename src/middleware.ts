import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const requestForNextAuth = {
    headers: Object.fromEntries(req.headers.entries()),
  };
  const session = await getSession({ req: requestForNextAuth });
  if (!session?.user) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/myaccount", "/checkout", "/order", "/orders"],
};
