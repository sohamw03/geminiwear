import connectDb from "@/middleware/mongoose";
import { NextResponse } from "next/server";
import User from "../../../../../models/User";

export const POST = async (req: Request) => {
  await connectDb();

  const { name, email, password }: any = await req.json();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User email already exists");
    }

    const newUser = new User({
      name, //
      email,
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      cardDetails: "",
    });
    newUser.setPassword(password);
    await newUser.save();
  } catch (error) {
    return NextResponse.json({ success: false, error: `${error}` }, { status: 200 });
  }

  return NextResponse.json({ success: true, message: `user created successfully`, data: { name, email, password } }, { status: 200 });
};
