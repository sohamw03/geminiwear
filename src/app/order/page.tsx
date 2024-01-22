"use client";
import { Values, useGlobal } from "@/contextWithDrivers/GlobalContext";
import { Button } from "@/shadcn/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";

export default function Order() {
  // Global context
  const { cart, subTotal }: Values = useGlobal();

  return (
    <section className="text-gray-400 overflow-hidden dark bg-background">
      <div className="container px-5 py-24 mx-auto">
        {/* Contains 2 sections: */}
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:py-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-300 tracking-widest">GEMINIWEAR</h2>
            <h1 className="text-gray-100 text-3xl title-font font-medium mb-1">Order ID : 92648</h1>
            {/* Show cart when not empty */}
            {Object.keys(cart).length !== 0 ? (
              <>
                <Table className="mt-2 rounded-md overflow-hidden">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-full">Item</TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
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
                        </TableCell>
                        <TableCell className="text-center align-top">{cart[_id].qty}</TableCell>
                        <TableCell className="text-right align-top">₹{cart[_id].price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={2}>Total</TableCell>
                      <TableCell className="text-right">₹{subTotal}</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </>
            ) : null}
            <Button className="mt-8 " variant={"default"}>
              Track Order
            </Button>
          </div>
          <div className="lg:w-1/2 lg:pl-10 mt-6 w-full lg:h-auto h-auto aspect-square rounded flex flex-wrap gap-2">
            {Object.keys(cart).map((_id, index) => {
              return <img key={index} alt="ecommerce" className={`object-cover rounded`} style={{ width: `calc(${100 / Object.keys(cart).length}% - 0.5rem)` }} src={cart[_id].img} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
