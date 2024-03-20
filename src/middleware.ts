import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req: NextRequestWithAuth) {
    console.log({ token: req.nextauth.token });

    if (req.nextUrl.pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    if (!req.nextauth.token) {
      return NextResponse.rewrite(new URL("/login", req.url));
    }

    return NextResponse.next();
  }
);

export const config = {
  matcher: ["/api/:path*", "/myaccount", "/checkout", "/order", "/orders"],
};
