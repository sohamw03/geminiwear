"use client";

import { Suspense } from "react";
import { Signup } from "./Signup";

export default function SignupPage() {
  return (
    <Suspense>
      <Signup />
    </Suspense>
  );
}
