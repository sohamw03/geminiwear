"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/shadcn/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Please enter a valid password. Minimum 8 characters.",
      })
      .max(32, {
        message: "Please enter a valid password. Maximum 32 characters.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function ForgotPassword({ params }: { params: { token: string } }) {
  // Login context
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Form validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(data);
    const payload = { password: data.password, token: params.token, email: searchParams.get("email") as string };

    try {
      const response = await fetch("/api/auth/resetpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const responseJson = await response.json();

      if (response?.ok && responseJson.success) {
        toast.success(`Password reset successfull!`, { position: "bottom-center" });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        toast.error(responseJson.error, { position: "bottom-center" });
      }
    } catch (error) {
      console.error(error);
    }
    form.reset();
    setLoading(false);
  };

  return (
    <main>
      <section className="text-white body-font dark bg-background">
        <div className="container px-5 py-20 mx-auto max-w-lg">
          {/* Login Information */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <input type="text" name="username" className="hidden" defaultValue={searchParams.get("email") || ""} disabled autoComplete="off" />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" className="focus-visible:ring-white" placeholder="Password" autoComplete="new-password" {...field} autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" className="focus-visible:ring-white" placeholder="Confirm Password" autoComplete="new-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant={"default"} className="mt-4 w-full" disabled={loading}>
                {loading ? <LoadingSpinner /> : "Reset Password"}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
