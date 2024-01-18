import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  await connectDb();

  const { products }: any = await req.json();
  try {

  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  } finally {
    return NextResponse.json({ message: "success", products: products }, { status: 200 });
  }
};
