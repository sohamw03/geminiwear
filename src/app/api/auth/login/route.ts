import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";
import User from "../../../../../models/User";

export const POST = async (req: Request) => {
  await connectDb();

  const { email, password }: any = await req.json();

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser && existingUser.password === password) {
      return NextResponse.json({ success: true, message: `user login successfull`, data: { name: existingUser.name, email } }, { status: 200 });
    } else {
      throw new Error("Email or password is incorrect");
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 200 });
  }
};
