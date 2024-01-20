import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";
import Product from "../../../../models/Product";

export const POST = async (req: Request) => {
  await connectDb();

  const { products }: any = await req.json();
  try {
    for (let i = 0; i < products.length; i++) {
      let p = new Product({
        title: products[i].title,
        slug: products[i].slug,
        desc: products[i].desc,
        img: products[i].img,
        category: products[i].category,
        size: products[i].size,
        color: products[i].color,
        price: products[i].price,
        availableQty: products[i].availableQty,
      });
      await p.save();
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true, products: products }, { status: 200 });
};
