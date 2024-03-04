"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { Values, addRemoveItemData, useGlobal } from "@/contextWithDrivers/GlobalContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/components/ui/accordion";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";
import { Textarea } from "@/shadcn/components/ui/textarea";
import { useEffect, useState } from "react";
import { RenderRazorpay } from "./useRenderRazorpay";

export default function Checkout() {
  // Global Context
  const { cart, subTotal, addToCart, removeFromCart, user, getUser, clearCart }: Values = useGlobal();

  // Local state
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>();
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [account, setAccount] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "createorder",
          amount: subTotal * 100, // Converting to lowest currency unit
          currency: "INR",
        }),
      });
      const responseJson = await response.json();

      if (responseJson.success && response.ok && responseJson.data.order_id) {
        setOrderDetails(() => ({
          orderId: responseJson.data.order_id,
          amount: responseJson.data.amount,
          currency: responseJson.data.currency,
        }));
        setDisplayRazorpay(true);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
          <h1 className="text-2xl mb-4 font-bold">Checkout</h1>
          <Accordion type="single">
            {/* 1. Your Information */}
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <h2 className="text-lg font-semibold">1. Your Information</h2>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 pt-2 pb-8">
                <Label htmlFor="name">Name</Label>
                <Input id="name" className="!opacity-75 !cursor-auto" placeholder="Name" disabled value={account.name} />
                <Label htmlFor="email">Email</Label>
                <Input id="email" className="!opacity-75 !cursor-auto" placeholder="Email" disabled value={account.email} />
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" className="!opacity-75 !cursor-auto" placeholder="Phone Number" disabled value={account.phone} />
              </AccordionContent>
            </AccordionItem>

            {/* 2. Shipping Address */}
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <h2 className="text-lg font-semibold ">2. Shipping Address</h2>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 py-2 pb-8">
                <Label htmlFor="address">Street Address</Label>
                <Textarea id="address" className="!opacity-75 !cursor-auto resize-none" placeholder="Street Address" disabled value={account.address} />
                <Label htmlFor="city">City</Label>
                <Input id="city" className="!opacity-75 !cursor-auto" placeholder="City" disabled value={account.city} />
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" className="!opacity-75 !cursor-auto" placeholder="State/Province" disabled value={account.state} />
                <Label htmlFor="postal">Postal Code</Label>
                <Input id="postal" className="!opacity-75 !cursor-auto" placeholder="Postal Code" disabled value={account.postalCode} />
                <Label htmlFor="country">Country</Label>
                <Input id="country" className="!opacity-75 !cursor-auto" placeholder="Country" disabled value={account.country} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* 3. Order Summary */}
          <h2 className="text-lg my-4 font-semibold">3. Order Summary</h2>
          {/* Show cart when not empty */}
          {Object.keys(cart).length !== 0 ? (
            <div className="rounded-xl border overflow-hidden">
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
                  {Object.keys(cart).map((_id, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium flex flex-col gap-2">
                        <span>
                          {cart[_id].title} ({cart[_id].size}) ({cart[_id].color})
                        </span>
                        <div className="flex flex-row gap-3 content-between items-center w-[6rem]">
                          <Button
                            variant="default"
                            size="sm"
                            className="aspect-square h-6 w-6 text-base leading-none"
                            onClick={() => {
                              handleRemoveFromCart({ _id, ...cart[_id] });
                            }}>
                            -
                          </Button>
                          <span className="flex items-center justify-center flex-1">{cart[_id].qty}</span>
                          <Button
                            variant="default"
                            size="sm"
                            className="aspect-square h-6 w-6 text-base leading-none"
                            onClick={() => {
                              handleAddToCart({ _id, ...cart[_id] });
                            }}>
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right align-top">₹{cart[_id].price}</TableCell>
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
              <Button variant={"default"} size={"lg"} className="w-full mt-4" onClick={handleCheckout} disabled={loading}>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <>
                    Confirm Order of&nbsp;<span className="font-bold">₹{subTotal}</span>
                  </>
                )}
              </Button>
            </div>
          ) : (
            // Show this when cart is empty
            <div className="flex flex-col items-center justify-center h-full mt-16">
              <h1 className="text-2xl font-bold">Your cart is empty</h1>
              <p className="text-gray-400">Add items to your cart to see them here.</p>
            </div>
          )}
        </div>
      </section>
      {orderDetails && displayRazorpay && (
        <RenderRazorpay //
          amount={orderDetails.amount}
          currency={orderDetails.currency}
          orderId={orderDetails.orderId}
          keyId={process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID as string}
          keySecret={process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_SECRET as string}
        />
      )}
    </main>
  );
}
