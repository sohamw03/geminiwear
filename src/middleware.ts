import { NextResponse } from "next/server";
import connectDb from "../middleware/mongoose";

export async function middleware(req: Request) {
  await connectDb();
  return NextResponse.next();
}
