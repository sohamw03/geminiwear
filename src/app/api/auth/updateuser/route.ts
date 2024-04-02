import { getCurrentUserData } from "@/lib/utils";
import connectDb from "@/middleware/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/User";

export const POST = async (req: NextRequest) => {
  await connectDb();

  const payload: any = await req.json();

  try {
    const userData = await getCurrentUserData(req);
    let user = await User.findOne({ email: userData?.email || "" });
    if (user) {
      const { phone, address, city, state, postalCode, country } = payload;
      // Update only the fields that are present in the payload
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
