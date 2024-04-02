import sendEmail from "@/functions/sendEmail";
import connectDb from "@/middleware/mongoose";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/User";

export const POST = async (req: NextRequest) => {
  await connectDb();

  const { email } = await req.json();
  let message;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetExpires = Date.now() + 3600000; // 1 hour from now

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;

    await user.save();

    // TODO: Send email with reset token
    const resetUrl = `${process.env.NEXT_PUBLIC_URL}/forgotpassword/${resetToken}?email=${email}`;
    await sendEmail(
      //
      user.email,
      "Password Reset",
      `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
    );

    message = "Email sent. Please check your inbox.";
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true, message: message }, { status: 200 });
};
