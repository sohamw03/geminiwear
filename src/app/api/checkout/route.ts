import { NextResponse } from "next/server";
import Order from "../../../../models/Order";
import User from "../../../../models/User";
import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";

export const POST = async (req: Request) => {
  await connectDb();

  const authorizationHeader = req.headers.get("Authorization");
  const token = authorizationHeader?.split(" ")[1] as string;

  const orderData = await req.json();

  try {
    if (!jwt.verify(token, process.env.JWT_SECRET as jwt.Secret)) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 });
    }
    const userData: any = jwt.decode(token);
    const user = await User.findOne({ email: userData.email });
    const order = new Order({
      userId: user?._id,
      products: Object.values(orderData.cart),
      address: orderData.address,
      amount: orderData.subTotal,
      paymentMethod: orderData.paymentMethod,
      phoneNumber: orderData.phoneNumber,
    });
    console.log(order);
    order.save();
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true, order: orderData }, { status: 200 });
};
