import connectDb from "@/middleware/mongoose";
import { serialize } from "cookie";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import User from "../../../../../models/User";

export const POST = async (req: Request) => {
  await connectDb();
  const { method } = req;
  const { email, password }: any = await req.json();

  if (method !== "POST") {
    return NextResponse.json({ success: false, error: "Invalid method" }, { status: 405 });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser && existingUser.validPassword(password)) {
      const secretKey = Buffer.from(process.env.JWT_SECRET as string, "utf8");
      // Create a JWT token
      const token = await new SignJWT({
        name: existingUser.name,
        email: existingUser.email,
        address: existingUser.address,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("1d")
        .sign(secretKey);
      const MAX_AGE = 24 * 60 * 60;

      return NextResponse.json(
        //
        { success: true, message: `User login successful`, data: { name: existingUser.name, email, token } },
        {
          status: 200,
          headers: {
            "Set-Cookie": serialize("token", token, {
              maxAge: MAX_AGE,
              path: "/",
              secure: true,
            }),
          },
        }
      );
    } else {
      throw new Error("Email or password is incorrect");
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 200 });
  }
};
