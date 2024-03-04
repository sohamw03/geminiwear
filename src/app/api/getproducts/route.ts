import { NextResponse } from "next/server";
import Product from "../../../../models/Product";
import connectDb from "@/middleware/mongoose";

export const POST = async (req: Request) => {
  await connectDb();

  const payload = await req.json();
  let products: Array<any> = [];

  try {
    if (payload.slug) {
      products[0] = await Product.findOne({ slug: payload.slug });
    } else {
      products = await Product.find();
    }
    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
};
