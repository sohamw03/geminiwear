"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/shadcn/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "Please enter a valid first name. Minimum 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Please enter a valid last name. Minimum 2 characters.",
    }),
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
export default function Signup() {
  const router = useRouter();

  // Form validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const payload = { ...data, name: `${data.firstName} ${data.lastName}` };
    try {
      const response = await fetch("/api/auth/signup", {
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
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        form.setError("email", { message: responseJson.error });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <section className="text-white body-font dark bg-background">
        <div className="container px-5 py-20 mx-auto max-w-lg">
          <h1 className="text-4xl mb-8 font-bold text-center">Signup</h1>
          {/* Signup Information */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input className="focus-visible:ring-white" placeholder="First Name" autoComplete="given-name" {...field} autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input className="focus-visible:ring-white" placeholder="Last Name" autoComplete="family-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input className="focus-visible:ring-white" placeholder="Email" autoComplete="email" {...field} />
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
                      <Input type="password" className="focus-visible:ring-white" placeholder="Password" autoComplete="new-password" {...field} />
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
              <Button type="submit" variant={"default"} className="mt-4 w-full">
                Signup
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
