import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import { ScrollArea } from "@/shadcn/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shadcn/components/ui/sheet";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";
import { ShoppingCart } from "lucide-react";

export default function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="dark relative transform-gpu -translate-x-2 translate-y-2">
          <Badge variant="default" className="absolute -top-3 -right-3 text-xs px-2">
            1
          </Badge>
          <ShoppingCart size={20} color="white" />
        </Button>
      </SheetTrigger>

      {/* Content */}
      <SheetContent className="text-white px-0">
        <ScrollArea className="px-5 mx-1">
          <SheetHeader>
            <SheetTitle>Cart</SheetTitle>
          </SheetHeader>
          <Button variant="default" size="sm" className="my-5 w-full">
            Proceed to buy
          </Button>
          <Table>
            <TableCaption>A list of your selected items.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-full">Item</TableHead>
                {/* <TableHead>Quantity</TableHead> */}
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {invoices.map((invoice) => (
                  <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                  </TableRow>
                ))} */}
              <TableRow>
                <TableCell className="font-medium flex flex-col gap-2">
                  <span>{"This shirt that is very black color and blue also."}</span>
                  <div>
                    <Button variant="default" size="sm" className="aspect-square h-6 w-6 text-base leading-none">
                      -
                    </Button>
                    <span className="px-3">{"1"}</span>
                    <Button variant="default" size="sm" className="aspect-square h-6 w-6 text-base leading-none">
                      +
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right align-top">{"₹500"}</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell className="text-right">₹500</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <Button variant="destructive" size="sm" className="my-6 w-full">
            Clear Cart
          </Button>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
