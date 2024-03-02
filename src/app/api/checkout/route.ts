import connectDb from "@/middleware/mongoose";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import CreateRazorpayOrder from "./CreateRazorpayOrder";
import Order from "../../../../models/Order";
import User from "../../../../models/User";

export const POST = async (req: Request) => {
  await connectDb();

  const authorizationHeader = req.headers.get("Authorization");
  const token = authorizationHeader?.split(" ")[1] as string;
  const userData = jwt.decode(token) as any;

  const orderData = await req.json();
  let dataToReturn;

  try {
    if (!jwt.verify(token, process.env.JWT_SECRET as jwt.Secret)) {
      return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 });
    }
    switch (orderData.type) {
      case "createorder":
        dataToReturn = await CreateRazorpayOrder({
          amount: orderData.amount,
          currency: orderData.currency,
          receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
        });
        if (!dataToReturn.success) throw new Error(dataToReturn.error);
        break;

      case "successpayment":
        const user = await User.findOne({ email: userData.email });
        console.log(orderData);
        const order = new Order({
          userId: user?._id,
          products: Object.values(orderData.cart),
          address: user?.address,
          amount: orderData.amount,
          paymentMethod: orderData.paymentMethod,
          phoneNumber: user?.phone,
          status: "pending",
          razorpayPaymentId: orderData.paymentId,
          razorpayOrderId: orderData.orderId,
        });

        await order.save();
        dataToReturn = order;

      default:
        break;
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true, data: dataToReturn });
};
