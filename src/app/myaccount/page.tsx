"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useGlobal } from "@/contextWithDrivers/GlobalContext";
import { Button } from "@/shadcn/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shadcn/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shadcn/components/ui/dialog";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { ScrollArea, ScrollBar } from "@/shadcn/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select";
import { Separator } from "@/shadcn/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/components/ui/tabs";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { Check, Copy } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

export default function MyAccount() {
  // Global context
  const { user, getUser, logout } = useGlobal();

  // Local context
  const [account, setAccount] = useState({
    name: "", //
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [isEditable, setIsEditable] = useState(false);
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);
  const [userTakeoutData, setUserTakeoutData] = useState({} as any);
  const [loadingStates, setLoadingStates] = useState({ saveData: false, deleteAccount: false });
  const [isCopied, setIsCopied] = useState(false);

  const router = useRouter();

  // Form validation
  const handleSubmit = async (e: React.MouseEvent, tab: "account" | "password" | "address" | "security") => {
    setLoadingStates((prev) => ({ ...prev, saveData: true }));
    e.preventDefault();
    console.log(account);

    let payload = {};
    switch (tab) {
      case "account":
        payload = {
          name: account.name,
          email: account.email,
          phone: account.phone,
        };
        break;
      case "password":
        return;
        break;
      case "address":
        payload = {
          address: account.address,
          city: account.city,
          state: account.state,
          postalCode: account.postalCode,
          country: account.country,
        };
        break;
    }

    try {
      const response = await fetch("/api/auth/updateuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const responseJson = await response.json();

      if (responseJson.success && response.ok) {
        let msg = "";
        switch (tab) {
          case "account":
            msg = "Account details updated successfully!";
            break;
          case "address":
            msg = "Address updated successfully!";
            break;
        }

        toast.success(msg, { position: "bottom-center" });
      } else {
        toast.error(`Error updating data. Please try again later.`, { position: "bottom-center" });
      }
      setIsEditable(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, saveData: false }));
    }
  };

  const getUserData = async () => {
    setUserTakeoutData(user);
  };

  // Delete account
  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const confirmation = (e.target as HTMLFormElement).confirmation.value;
    if (confirmation !== "delete-personal-account") {
      toast.error("Confirmation code is incorrect. Please try again.", { position: "bottom-center" });
      return;
    }

    try {
      const response = await fetch("/api/auth/deleteuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();

      if (responseJson.success && response.ok) {
        toast.success("Account deleted successfully!", { position: "bottom-center" });
        setIsAccountDeleted(true);
        logout();
      } else {
        toast.error(`Error deleting account. Please try again later.`, { position: "bottom-center" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const call = async () => {
      const userData = await getUser();
      console.log(userData);
      setAccount({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        state: userData.state,
        postalCode: userData.postalCode,
        country: userData.country,
      });
    };
    call();
  }, []);

  return (
    <main>
      <section className="text-white body-font dark bg-background">
        <div className="container px-5 py-12 mx-auto max-w-2xl xl:max-w-5xl">
          <h1 className="text-2xl text-white mb-8">Account Details</h1>
          {/* Account Information */}
          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="security">Security & Data</TabsTrigger>
            </TabsList>

            {/* Account */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      name="name"
                      className="focus-visible:ring-white"
                      id="name"
                      value={account.name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setAccount((prev) => ({ ...prev, name: e.target.value }));
                      }}
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      className="focus-visible:ring-white"
                      id="email"
                      value={account.email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setAccount((prev) => ({ ...prev, email: e.target.value }));
                      }}
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      name="phone"
                      className="focus-visible:ring-white"
                      id="phone"
                      value={account.phone}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setAccount((prev) => ({ ...prev, phone: e.target.value }));
                      }}
                      disabled={!isEditable}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row gap-2">
                  {isEditable && (
                    <Button className="w-[7.82rem]" onClick={(e) => handleSubmit(e, "account")} disabled={loadingStates.saveData}>
                      {loadingStates.saveData ? <LoadingSpinner /> : "Save changes"}
                    </Button>
                  )}
                  <Button onClick={() => setIsEditable(!isEditable)} variant={isEditable ? "destructive" : "default"}>
                    {isEditable ? "Cancel" : "Edit"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Password */}
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Forgot Password</CardTitle>
                  <CardDescription>Get a link to reset your password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href={"/forgotpassword"} target="_blank">
                    <Button>Reset Password</Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Address */}
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Address</CardTitle>
                  <CardDescription>Enter the address you want your products to ship to. Click save when you're done.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="address">Street Address</Label>
                    <Textarea
                      name="address"
                      className="focus-visible:ring-white"
                      id="name"
                      value={account.address}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        setAccount((prev) => ({ ...prev, address: e.target.value }));
                      }}
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="city">City</Label>
                    <Input
                      name="city"
                      className="focus-visible:ring-white"
                      id="city"
                      value={account.city}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setAccount((prev) => ({ ...prev, city: e.target.value }));
                      }}
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="state">State</Label>
                    <Input
                      name="state"
                      className="focus-visible:ring-white"
                      id="state"
                      value={account.state}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setAccount((prev) => ({ ...prev, state: e.target.value }));
                      }}
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      name="postalCode"
                      className="focus-visible:ring-white"
                      id="postalCode"
                      value={account.postalCode}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setAccount((prev) => ({ ...prev, postalCode: e.target.value }));
                      }}
                      disabled={!isEditable}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="country">Country</Label>
                    <Select onValueChange={(value) => setAccount((prev) => ({ ...prev, country: value }))} value={account.country} disabled={!isEditable}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-row gap-2">
                  {isEditable && (
                    <Button className="w-[7.82rem]" onClick={(e) => handleSubmit(e, "address")} disabled={loadingStates.saveData}>
                      {loadingStates.saveData ? <LoadingSpinner /> : "Save changes"}
                    </Button>
                  )}
                  <Button onClick={() => setIsEditable(!isEditable)} variant={isEditable ? "destructive" : "default"}>
                    {isEditable ? "Cancel" : "Edit"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Security */}
            <TabsContent value="security">
              <Card>
                <CardContent className="space-y-2 pt-6">
                  {/* Export User Data */}
                  <h3 className="text-xl leading-none tracking-tight">Export Data</h3>
                  <p className="text-sm text-muted-foreground pb-2">Export all the data that we have.</p>
                  <Button
                    className="mb-6"
                    onClick={() => {
                      getUserData();
                    }}
                    variant={"secondary"}>
                    Export
                  </Button>
                  {JSON.stringify(userTakeoutData) !== "{}" && (
                    <ScrollArea className="whitespace-nowrap bg-inherit p-4 rounded-lg border">
                      {/* Copy Button */}
                      <Button
                        variant="outline"
                        className="absolute top-4 right-4 rounded w-8 h-8 p-2"
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(userTakeoutData, null, 2));
                          setIsCopied(true);
                          setTimeout(() => {
                            setIsCopied(false);
                          }, 2000);
                        }}>
                        {!isCopied ? <Copy className="text-sm" size={16} /> : <Check className="text-sm" size={16} />}
                      </Button>
                      <pre>{JSON.stringify(userTakeoutData, null, 2)}</pre>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  )}
                  <Separator className="!my-4" />
                  {/* Delete Account */}
                  <h3 className="text-xl leading-none tracking-tight pb-2">Delete your Account</h3>
                  <p className="text-sm text-muted-foreground pb-2">Once you delete your account, there is no going back. Please be certain.</p>
                  <Dialog open={isAccountDeleted ? false : undefined}>
                    <DialogTrigger asChild>
                      {!isAccountDeleted && (
                        <Button variant={"destructive"} disabled={loadingStates.deleteAccount}>
                          {loadingStates.deleteAccount ? "Deleting..." : "Delete Account"}
                        </Button>
                      )}
                    </DialogTrigger>
                    <DialogContent className="text-white">
                      <DialogHeader>
                        <DialogTitle>Delete Account</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleDeleteAccount} id="deleteAccountForm">
                        <Label htmlFor="confirmation" className="text-muted-foreground">
                          Please type <span className="font-bold">delete-personal-account</span> to confirm the deletion of account.
                        </Label>
                        <Input id="confirmation" type="text" name="confirmation" className="focus-visible:ring-white text-inherit w-full mt-2" />
                      </form>
                      <DialogFooter className="flex flex-row !justify-between">
                        <DialogClose asChild>
                          <Button variant={"secondary"}>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" form="deleteAccountForm" variant={"destructive"}>
                          Delete Account
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
}
