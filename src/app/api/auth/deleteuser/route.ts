import connectDb from "@/middleware/mongoose";
import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/User";

export const POST = async (req: NextRequest) => {
  await connectDb();

  const token = req.cookies.get("token")?.value as string;

  let userTakeoutData;

  try {
    const userData: any = await decodeJwt(token);
    userTakeoutData = await User.findOneAndDelete({ email: userData.email });
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true, message: "User deleted successfully.", data: userTakeoutData }, { status: 200 });
};
