import { getCurrentUserData } from "@/lib/utils";
import connectDb from "@/middleware/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/User";

export const POST = async (req: NextRequest) => {
  await connectDb();

  try {
    const userData = await getCurrentUserData(req);
    await User.deleteOne({ email: userData?.email || "" });
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true, message: "User deleted successfully." }, { status: 200 });
};
