"use client";
import GwImage from "@/lib/GwImage";
import { Button } from "@/shadcn/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Order({ params }: { params: { orderid: string } }) {
  const [order, setOrder] = useState({
    _id: "",
    products: [],
    amount: 0,
  });

  // Get the order from the server
  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/getorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderid: params.orderid, mode: "one" }),
      });
      const responseJson = await response.json();

      if (responseJson.success && response.ok && responseJson.orders[0]) {
        console.log(responseJson.orders);
        setOrder(responseJson.orders[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <section className="text-gray-400 overflow-hidden dark bg-background">
      <div className="container px-5 py-24 mx-auto">
        <Link href={"/orders"}>
          <Button className="mb-4" variant={"ghost"}>
            <MoveLeft size={16} />
            &nbsp; All Orders
          </Button>
        </Link>
        {/* Contains 2 sections: */}
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:py-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-300 tracking-widest">GEMINIWEAR</h2>
            <h1 className="text-gray-100 text-3xl title-font font-medium mb-1">Order ID : {order._id.substring(0, 6)}</h1>
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
                {order.products.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium flex flex-col gap-2">
                      <span>
                        {item.title} ({item.size}) ({item.color})
                      </span>
                    </TableCell>
                    <TableCell className="text-center align-top">{item.qty}</TableCell>
                    <TableCell className="text-right align-top">₹{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell className="text-right">₹{order.amount}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
            <Button className="mt-8 " variant={"default"}>
              Track Order
            </Button>
          </div>
          <div className="lg:w-1/2 lg:pl-10 mt-6 w-full lg:h-auto h-auto aspect-square rounded flex flex-wrap gap-2">
            {order.products.map((item: any, index: number) => {
              return <GwImage key={index} alt="ecommerce" className={`object-cover rounded w-full h-full`} superStyle={{ width: `calc(${100 / order.products.length}% - 0.5rem)` }} src={item.img} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
