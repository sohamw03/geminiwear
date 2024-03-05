import connectDb from "@/middleware/mongoose";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/User";

export const POST = async (req: NextRequest) => {
  await connectDb();

  const token = req.cookies.get("token")?.value as string;
  const userData: any = await decodeJwt(token);

  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      cookies().delete("token");
      return NextResponse.json({ success: true, message: `User logged out` }, { status: 200 });
    } else {
      throw new Error("Invalid user. Please log in.");
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 200 });
  }
};
