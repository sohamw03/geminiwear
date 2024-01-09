import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";
import Product from "../../../../models/Product";

export const POST = async (req: Request) => {
  await connectDb();

  const { products }: any = await req.json();
  try {
    for (let i = 0; i < products.length; i++) {
      let p = await Product.findByIdAndUpdate(products[i]._id, products[i]);
      await p.save();
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  } finally {
    return NextResponse.json({ message: "success", products: products }, { status: 200 });
  }
};
