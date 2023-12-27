"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Values, addRemoveItemData, useGlobal } from "@/contextWithDrivers/GlobalContext";
import { Button } from "@/shadcn/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/shadcn/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select";
import { Separator } from "@/shadcn/components/ui/separator";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phoneNumber: z.string(),
  streetAddress: z.string(),
  city: z.string(),
  stateProvince: z.string(),
  postalCode: z.string(),
  country: z.string(),
  paymentMethod: z.string(),
});

export default function Checkout() {
  // Global Context
  const { cart, subTotal, addToCart, removeFromCart }: Values = useGlobal();

  // Form validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      streetAddress: "",
      city: "",
      stateProvince: "",
      postalCode: "",
      country: "",
      paymentMethod: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  // Handling cart items
  const handleAddToCart = (itemData: addRemoveItemData) => {
    itemData.qty = 1;
    addToCart(itemData);
  };

  const handleRemoveFromCart = (itemData: addRemoveItemData) => {
    itemData.qty = 1;
    removeFromCart(itemData);
  };

  return (
    <main>
      <section className="text-white body-font dark bg-background">
        <div className="container px-5 py-12 mx-auto max-w-2xl xl:max-w-5xl">
          <h1 className="text-2xl mb-4 font-bold">Checkout</h1>
          {/* 1. Your Information */}
          <h2 className="text-lg mt-6 font-semibold">1. Your Information</h2>
          <Separator className="mt-2 mb-6" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input className="focus-visible:ring-white" placeholder="Name" {...field} autoFocus />
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
                      <Input className="focus-visible:ring-white" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input className="focus-visible:ring-white" placeholder="Phone Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 2. Shipping Address */}
              <h2 className="text-lg !mt-8 font-semibold">2. Shipping Address</h2>
              <Separator className="!my-2" />
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input className="focus-visible:ring-white" placeholder="Street Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input className="focus-visible:ring-white" placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stateProvince"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Province</FormLabel>
                    <FormControl>
                      <Input className="focus-visible:ring-white" placeholder="State/Province" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input className="focus-visible:ring-white" placeholder="Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="us">United States</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 3. Payment Information */}
              <h2 className="text-lg !mt-8 font-semibold">3. Payment Information</h2>
              <Separator className="!my-2" />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                        <FormItem className="flex items-center space-x-3 space-y-0 border h-16 rounded px-4">
                          <FormControl>
                            <RadioGroupItem value="credit" />
                          </FormControl>
                          <FormLabel className="font-normal h-full w-full flex items-center cursor-pointer">Credit Card</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 border h-16 rounded px-4">
                          <FormControl>
                            <RadioGroupItem value="upi" />
                          </FormControl>
                          <FormLabel className="font-normal h-full w-full flex items-center cursor-pointer">UPI</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 border h-16 rounded px-4">
                          <FormControl>
                            <RadioGroupItem value="cod" />
                          </FormControl>
                          <FormLabel className="font-normal h-full w-full flex items-center cursor-pointer">Cash On Delivery</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size={"lg"} variant={"secondary"}>
                Save
              </Button>
            </form>
          </Form>
          {/* 4. Order Summary */}
          <h2 className="text-lg mt-8 font-semibold">4. Order Summary</h2>
          <Separator className="my-2" />
          {/* Show cart when not empty */}
          {Object.keys(cart).length !== 0 ? (
            <>
              <Table>
                <TableCaption>A list of your selected items.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-full">Item</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Items in the cart */}
                  {Object.keys(cart).map((itemCode, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium flex flex-col gap-2">
                        <span>{cart[itemCode].name}</span>
                        <div className="flex flex-row gap-3 content-between items-center w-[6rem]">
                          <Button
                            variant="default"
                            size="sm"
                            className="aspect-square h-6 w-6 text-base leading-none"
                            onClick={() => {
                              handleRemoveFromCart({ itemCode, ...cart[itemCode] });
                            }}>
                            -
                          </Button>
                          <span className="flex items-center justify-center flex-1">{cart[itemCode].qty}</span>
                          <Button
                            variant="default"
                            size="sm"
                            className="aspect-square h-6 w-6 text-base leading-none"
                            onClick={() => {
                              handleAddToCart({ itemCode, ...cart[itemCode] });
                            }}>
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right align-top">₹{cart[itemCode].price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">₹{subTotal}</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
              <Button variant={"default"} size={"lg"} className="w-full mt-8">
                Confirm Order (₹{subTotal})
              </Button>
            </>
          ) : (
            // Show this when cart is empty
            <div className="flex flex-col items-center justify-center h-full mt-16">
              <h1 className="text-2xl font-bold">Your cart is empty</h1>
              <p className="text-gray-400">Add items to your cart to see them here.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
