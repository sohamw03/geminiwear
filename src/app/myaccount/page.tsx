"use client";

import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/components/ui/tabs";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function MyAccount() {
  const router = useRouter();

  // Form validation
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(Object.fromEntries(formData.entries()));
    const payload = {};
    // try {
    //   const response = await fetch("/api/user", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   });
    //   const responseJson = await response.json();

    //   if (responseJson.success && response.ok) {
    //     toast.success(`Welcome ${responseJson.data.name}!`, { position: "bottom-center" });
    //     setTimeout(() => {
    //       router.push("/login");
    //     }, 2000);
    //   } else {
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <main>
      <section className="text-white body-font dark bg-background">
        <div className="container px-5 py-12 mx-auto max-w-2xl xl:max-w-5xl">
          <h1 className="text-2xl text-white mb-8">Account Details</h1>
          {/* Account Information */}
          <Tabs defaultValue="address" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Address</CardTitle>
                  <CardDescription>Enter the address you want your products to ship to. Click save when you're done.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Textarea name="address" className="focus-visible:ring-white" id="name" defaultValue="" required autoFocus />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="username">Pincode</Label>
                      <Input name="pincode" className="focus-visible:ring-white" id="username" defaultValue="" required />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save changes</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
