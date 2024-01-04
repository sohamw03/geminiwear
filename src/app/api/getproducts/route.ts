import { NextResponse } from "next/server";
import Product from "../../../../models/Product";

export const POST = async (req: Request) => {
  // let products = await Product.find();
  return NextResponse.json({ products: "" }, { status: 200 });
};
