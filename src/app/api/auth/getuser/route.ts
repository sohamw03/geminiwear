import { getCurrentUserData } from "@/lib/utils";
import connectDb from "@/middleware/mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../models/User";

export const POST = async (req: NextRequest) => {
  await connectDb();

  let userData = {};

  try {
    const userDataToken = await getCurrentUserData(req);
    // console.log({ userDataToken });

    const user = await User.findOne({ email: userDataToken?.email || "" });
    userData = {
      name: user?.name, //
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      city: user?.city,
      state: user?.state,
      postalCode: user?.postalCode,
      country: user?.country,
    };
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 500 });
  }
  return NextResponse.json({ success: true, user: userData }, { status: 200 });
};
