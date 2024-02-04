import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import User from "../../../../../models/User";

export const POST = async (req: Request) => {
  await connectDb();

  const authorizationHeader = req.headers.get("Authorization");
  const token = authorizationHeader?.split(" ")[1] as string;

  let userData = {};

  try {
    if (!jwt.verify(token, process.env.JWT_SECRET as jwt.Secret)) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 });
    }
    const userDataToken: any = jwt.decode(token);
    const user = await User.findOne({ email: userDataToken.email });
    userData = { name: user?.name, email: user?.email, address: user?.address };
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true, user: userData }, { status: 200 });
};
