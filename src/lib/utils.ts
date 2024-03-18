import { clsx, type ClassValue } from "clsx";
import { getSession } from "next-auth/react";
import { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getCurrentUserData(req: NextRequest) {
  const requestForNextAuth = {
    headers: Object.fromEntries(req.headers.entries()),
  };
  const session = await getSession({ req: requestForNextAuth });
  if (!session?.user) {
    return null;
  }
  return session.user;
}
