"use client";
import { Values, addRemoveItemData, useGlobal } from "@/contextWithDrivers/GlobalContext";
import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import { ScrollArea } from "@/shadcn/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shadcn/components/ui/sheet";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const { cart, addToCart, removeFromCart, clearCart, subTotal }: Values = useGlobal();

  const [totalItems, setTotalItems] = useState(0);

  const handleAddToCart = (itemData: addRemoveItemData) => {
    itemData.qty = 1;
    addToCart(itemData);
  };

  const handleRemoveFromCart = (itemData: addRemoveItemData) => {
    itemData.qty = 1;
    removeFromCart(itemData);
  };

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < Object.keys(cart).length; i++) {
      const currentItem = cart[Object.keys(cart)[i]];
      total += currentItem.qty;
    }
    setTotalItems(total);
  }, [cart]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="dark relative transform-gpu -translate-x-2 translate-y-2">
          {totalItems !== 0 ? (
            <Badge variant="default" className="absolute -top-3 -right-3 text-xs px-2">
              {totalItems}
            </Badge>
          ) : null}
          <ShoppingCart size={20} color="white" />
        </Button>
      </SheetTrigger>

      {/* Content */}
      <SheetContent className="text-white px-0 w-full">
        <ScrollArea className="px-5 mx-1">
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
          </SheetHeader>
          {/* Show cart when not empty */}
          {Object.keys(cart).length !== 0 ? (
            <>
              <Link href={"/checkout"}>
                <Button variant="default" size="sm" className="my-5 w-full">
                  Proceed to buy
                </Button>
              </Link>
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
              <Button variant="destructive" size="sm" className="my-6 w-full" onClick={clearCart}>
                Clear Cart
              </Button>
            </>
          ) : (
            // Show this when cart is empty
            <div className="flex flex-col items-center justify-center h-full mt-16">
              <h1 className="text-2xl font-bold">Your cart is empty</h1>
              <p className="text-gray-400">Add items to your cart to see them here.</p>
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
