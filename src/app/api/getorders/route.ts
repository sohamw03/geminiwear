import connectDb from "@/middleware/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Order from "../../../../models/Order";
import User from "../../../../models/User";

export const POST = async (req: NextRequest) => {
  await connectDb();

  const payload = await req.json();

  let ordersData = [];

  try {
    const userData = payload.userData;
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
