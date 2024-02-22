import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "../../../../../models/User";

export const POST = async (req: Request) => {
  await connectDb();

  const authorizationHeader = req.headers.get("Authorization");
  const token = authorizationHeader?.split(" ")[1] as string;

  const payload = (await req.json()) as { address: string };

  try {
    if (!jwt.verify(token, process.env.JWT_SECRET as jwt.Secret)) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 });
    }
    const userData: any = jwt.decode(token);
    let user = await User.findOne({ email: userData.email });
    user?.set({ ...payload });
    user?.save();
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true }, { status: 200 });
};
