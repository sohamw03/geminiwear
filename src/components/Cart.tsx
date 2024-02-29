"use client";
import { Values, addRemoveItemData, useGlobal } from "@/contextWithDrivers/GlobalContext";
import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import { ScrollArea } from "@/shadcn/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shadcn/components/ui/sheet";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function Cart() {
  // Global context
  const { cart, addToCart, removeFromCart, clearCart, subTotal, user, isCartOpen, setIsCartOpen, getUser }: Values = useGlobal();

  const [totalItems, setTotalItems] = useState(0);
  const [loadingStates, setLoadingStates] = useState({ proceedToBuy: false });

  const router = useRouter();

  const handleAddToCart = (itemData: addRemoveItemData) => {
    itemData.qty = 1;
    addToCart(itemData);
  };

  const handleRemoveFromCart = (itemData: addRemoveItemData) => {
    itemData.qty = 1;
    removeFromCart(itemData);
  };

  const proceedToBuy = () => {
    setLoadingStates({ ...loadingStates, proceedToBuy: true });
    if (user.loggedIn) {
      setIsCartOpen(false);
      getUser();
      router.push("/checkout");
    } else {
      setIsCartOpen(false);
      router.push("/login");
    }
    setTimeout(() => {
      setLoadingStates({ ...loadingStates, proceedToBuy: false });
    }, 1000);
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
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="dark relative">
          {totalItems !== 0 ? (
            <Badge variant="default" className="absolute -top-2 -right-2 text-xs leading-none px-1">
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
              <Button variant="default" size="sm" className="my-5 w-full" onClick={proceedToBuy} disabled={loadingStates.proceedToBuy}>
                {loadingStates.proceedToBuy ? <LoadingSpinner /> : "Proceed to Buy"}
              </Button>
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
