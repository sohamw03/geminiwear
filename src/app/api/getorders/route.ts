import connectDb from "@/middleware/mongoose";
import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";
import Order from "../../../../models/Order";
import User from "../../../../models/User";

export const POST = async (req: NextRequest) => {
  await connectDb();

  const token = req.cookies.get("token")?.value as string;

  let ordersData = [];

  try {
    const userData: any = await decodeJwt(token);
    const user = await User.findOne({ email: userData.email });
    ordersData = await Order.find({ userId: user?._id }).sort({ createdAt: -1 });
    ordersData.forEach((order) => {
      order.amount = order.amount / 100;
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true, orders: ordersData }, { status: 200 });
};
