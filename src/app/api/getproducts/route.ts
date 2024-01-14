import { NextResponse } from "next/server";
import Product from "../../../../models/Product";
import connectDb from "@/middleware/mongoose";

export const POST = async (req: Request) => {
  await connectDb();

  const { slug } = await req.json();

  try {
    const products = await Product.find();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
