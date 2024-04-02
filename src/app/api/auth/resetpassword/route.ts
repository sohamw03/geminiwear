import connectDb from "@/middleware/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/User";

export const POST = async (req: NextRequest) => {
  await connectDb();

  const { email, token, password } = await req.json();
  let message;

  try {
    const user = await User.findOne({ email });
    if (user && user.resetPasswordToken === token && user.resetPasswordExpires > Date.now()) {
      user.setPassword(password);
      user.resetPasswordExpires = Date.now() - 3600000;
      await user.save();
      message = "Password reset successful";
    } else {
      return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true, message: message }, { status: 200 });
};
