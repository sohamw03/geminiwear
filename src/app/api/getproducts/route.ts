import { NextResponse } from "next/server";
import Product from "../../../../models/Product";
import connectDb from "@/middleware/mongoose";

export const POST = async (req: Request) => {
  await connectDb();

  let products = await Product.find();
  return NextResponse.json({ products }, { status: 200 });
};
