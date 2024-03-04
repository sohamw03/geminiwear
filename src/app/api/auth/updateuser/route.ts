import connectDb from "@/middleware/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/User";
import { decodeJwt } from "jose";

export const POST = async (req: NextRequest) => {
  await connectDb();

  const token = req.cookies.get("token")?.value as string;

  const payload: any = await req.json();

  try {
    const userData: any = await decodeJwt(token);
    let user = await User.findOne({ email: userData.email });
    if (user) {
      const { phone, address, city, state, postalCode, country } = payload;
      user.set({
        ...(phone && { phone }),
        ...(address && { address }),
        ...(city && { city }),
        ...(state && { state }),
        ...(postalCode && { postalCode }),
        ...(country && { country }),
      });
      user.save();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true }, { status: 200 });
};
