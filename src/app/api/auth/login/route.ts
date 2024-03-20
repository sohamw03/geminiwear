// DEPRECATED
// ---------------------------------------------------------------------------------
import connectDb from "@/middleware/mongoose";
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
      return NextResponse.json({ success: true, message: `User login successful`, data: { name: existingUser.name, email } });
    } else {
      throw new Error("Email or password is incorrect");
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 200 });
  }
};
