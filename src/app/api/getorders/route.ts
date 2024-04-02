import { getCurrentUserData } from "@/lib/utils";
import connectDb from "@/middleware/mongoose";
import { NextRequest, NextResponse } from "next/server";
import Order from "../../../../models/Order";
import User from "../../../../models/User";

export const POST = async (req: NextRequest) => {
  await connectDb();

  const { orderid, mode }: { orderid: string; mode: string } = await req.json();
  let ordersData: any[] = [];

  try {
    const userData = await getCurrentUserData(req);
    const user = await User.findOne({ email: userData?.email || "" });
    switch (mode) {
      case "one":
        console.log("orderSpecific");
        ordersData = await Order.find({ userId: user?._id, _id: orderid }).sort({ createdAt: -1 });
        break;
      case "all":
        ordersData = await Order.find({ userId: user?._id }).sort({ createdAt: -1 });
        break;
    }
    ordersData.forEach((order) => {
      order.amount = order.amount / 100;
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true, orders: ordersData }, { status: 200 });
};
