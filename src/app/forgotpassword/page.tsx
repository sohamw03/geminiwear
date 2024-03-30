"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/shadcn/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function ForgotPassword() {
  // Login context
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Form validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(data);

    try {
      const response = await fetch("/api/auth/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response?.ok) {
        form.reset();
        toast.success(`You will receive an email with instructions.`, { position: "bottom-center" });
        setTimeout(() => {
          router.push("/");
        }, 2000);
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
          {/* Login Information */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <p className="text-sm text-muted-foreground">Enter registered email address that is associated with your account.</p>
                    </FormLabel>
                    <FormControl>
                      <Input className="focus-visible:ring-white" placeholder="Email" autoComplete="email" {...field} autoFocus />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant={"default"} className="mt-4 w-full" disabled={loading}>
                {loading ? <LoadingSpinner /> : "Send Email"}
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
}
