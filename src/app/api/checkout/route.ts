import connectDb from "@/middleware/mongoose";

import { NextRequest, NextResponse } from "next/server";
import Order from "../../../../models/Order";
import User from "../../../../models/User";
import CreateRazorpayOrder from "./CreateRazorpayOrder";
import { getCurrentUserData } from "@/lib/utils";

export const POST = async (req: NextRequest) => {
  await connectDb();

  const orderData = await req.json();
  const userData = await getCurrentUserData(req);

  let dataToReturn;

  try {
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
        const user = await User.findOne({ email: userData?.email || "" });
        // console.log(orderData);
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
