import { KeyLike, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value as string;
  if (!token) {
    return NextResponse.rewrite(new URL("/dest", req.url));
  }

  const secretKey = Buffer.from(process.env.JWT_SECRET as string, "utf8");
  const isVerified = await jwtVerify(token, secretKey, { algorithms: ["HS256"] });
  if (!isVerified) {
    return NextResponse.rewrite(new URL("/dest", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*", "/myaccount", "/checkout", "/order", "/orders"],
};
