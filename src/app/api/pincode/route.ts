import { NextRequest, NextResponse } from "next/server";

const serviceablePincodes = ["431002", "431003", "431004", "431005"]; // Example list of serviceable pincodes

export function GET(req: NextRequest, res: NextResponse) {
  const p = req.nextUrl.searchParams.get("p") || "";

  return NextResponse.json({ success: true, userPincode: p, serviceablePincodes });
}
