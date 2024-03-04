"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useGlobal } from "@/contextWithDrivers/GlobalContext";
import { Button } from "@/shadcn/components/ui/button";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Please enter a valid password. Minimum 8 characters.",
    })
    .max(32, {
      message: "Please enter a valid password. Maximum 32 characters.",
    }),
  rememberMe: z.boolean().optional(),
});

export default function Login() {
  // Global context
  const { setUser } = useGlobal();

  // Login context
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Form validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(data);
    const payload = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const responseJson = await response.json();

      if (responseJson.success && response.ok) {
        toast.success(`Welcome ${responseJson.data.name}!`, { position: "bottom-center" });
        form.reset();

        let user = { loggedIn: false, name: "" };
        const match = document.cookie.match("(^|;)\\s*" + "token" + "\\s*=\\s*([^;]+)");
        const token = match ? match.pop() : "";

        if (token) {
          const decodedToken = jwtDecode(token) as { exp: number; name: string };
          const currentTime = Date.now() / 1000;
          user = { loggedIn: decodedToken.exp > currentTime, name: decodedToken.name };
        }

        setUser(user);

        setTimeout(() => {
          router.push("/tshirts");
        }, 2000);
      } else {
        form.setError("email", { message: responseJson.error });
        form.setError("password", { message: responseJson.error });
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <main>
      <section className="text-white body-font dark bg-background">
        <div className="container px-5 py-20 mx-auto max-w-lg">
          <h1 className="text-4xl mb-8 font-bold text-center">Login</h1>
          {/* Login Information */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input className="focus-visible:ring-white" placeholder="Email" autoComplete="email" {...field} autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" className="focus-visible:ring-white" placeholder="Password" autoComplete="current-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Remember me</FormLabel>
                    </div>
                    <FormLabel className="flex justify-end align-middle flex-1 underline">
                      <Link href="/forgot-password" className="text-sm font-medium leading-none opacity-70">
                        Forgot your password?
                      </Link>
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Button type="submit" variant={"default"} className="mt-4 w-full" disabled={loading}>
                {loading ? <LoadingSpinner /> : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
