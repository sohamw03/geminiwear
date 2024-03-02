import connectDb from "@/middleware/mongoose";
import crypto from "crypto";
import { NextResponse } from "next/server";

const payment_capture_secret_key = process.env.PAYMENT_CAPTURE_SECRET_KEY as string;

export const POST = async (req: Request) => {
  await connectDb();

  const reqBody = await req.json();
  const data = crypto.createHmac("sha256", payment_capture_secret_key);
  data.update(JSON.stringify(reqBody));
  const digest = data.digest("hex");

  if (digest === req.headers.get("x-razorpay-signature")) {
    console.log("Request is legit");
    try {
      // if (!jwt.verify(token, process.env.JWT_SECRET as jwt.Secret)) {
      //   return NextResponse.json({ success: false, error: "No token provided" }, { status: 401 });
      // }
      // const userData: any = jwt.decode(token);
      // const user = await User.findOne({ email: userData.email });
      // const order = new Order({
      //   userId: user?._id,
      //   products: Object.values(orderData.cart),
      //   address: orderData.user.address,
      //   amount: orderData.subTotal,
      //   paymentMethod: "Comes from Razorpay response",
      //   phoneNumber: orderData.user.phoneNumber,
      // });
      // console.log(order);
      // order.save();
    } catch (error) {
      return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } else {
    return NextResponse.json("Invalid Signature", { status: 400 });
  }
};
