import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";
import User from "../../../../../models/User";
import jwt from "jsonwebtoken";

export const POST = async (req: Request) => {
  await connectDb();

  const { email, password }: any = await req.json();

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser && existingUser.validPassword(password)) {
      const token = jwt.sign({ name: existingUser.name, email: existingUser.email, address: existingUser.address }, process.env.JWT_SECRET as jwt.Secret, { expiresIn: "1d" });

      return NextResponse.json({ success: true, message: `user login successful`, data: { name: existingUser.name, email, token } }, { status: 200 });
    } else {
      throw new Error("Email or password is incorrect");
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 200 });
  }
};
