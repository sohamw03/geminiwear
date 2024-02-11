import { NextResponse } from "next/server";
import Order from "../../../../models/Order";
import User from "../../../../models/User";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";

export const POST = async (req: Request) => {
  await connectDb();

  const authorizationHeader = req.headers.get("Authorization");
  const token = authorizationHeader?.split(" ")[1] as string;

  let ordersData = [];

  try {
    if (!jwt.verify(token, process.env.JWT_SECRET as jwt.Secret)) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 });
    }
    const userData: any = jwt.decode(token);
    const user = await User.findOne({ email: userData.email });
    ordersData = await Order.find({ userId: user?._id }).sort({ createdAt: -1 });
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true, orders: ordersData }, { status: 200 });
};
