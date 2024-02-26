import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "../../../../../models/User";

export const POST = async (req: Request) => {
  await connectDb();

  const authorizationHeader = req.headers.get("Authorization");
  const token = authorizationHeader?.split(" ")[1] as string;
  let userTakeoutData;

  try {
    if (!jwt.verify(token, process.env.JWT_SECRET as jwt.Secret)) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 });
    }
    const userData: any = jwt.decode(token);
    userTakeoutData = await User.findOneAndDelete({ email: userData.email });
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true, message: "User deleted successfully.", data: userTakeoutData }, { status: 200 });
};