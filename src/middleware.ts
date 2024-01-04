import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
