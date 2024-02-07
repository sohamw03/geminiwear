"use client";
import { Button } from "@/shadcn/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/getorders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const responseJson = await response.json();

      if (responseJson.success && response.ok) {
        console.log(responseJson.orders);
        setOrders(responseJson.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <main>
      <section className="text-white body-font dark bg-background">
        <div className="flex flex-col gap-4 container px-5 py-12 mx-auto max-w-3xl xl:max-w-5xl">
          <h1 className="text-2xl font-bold">Your orders</h1>
          {orders.map((order: any, index) => (
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-24"></TableHead>
                    <TableHead className="py-4">
                      <div className="flex flex-col">
                        <span>Order Placed</span>
                        <span className="text-white">{new Date(order.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </TableHead>
                    <TableHead className="py-4">
                      <div className="flex flex-col">
                        <span>Total</span>
                        <span className="text-white">₹ {order.amount}</span>
                      </div>
                    </TableHead>
                    <TableHead className="py-4">
                      <div className="flex flex-col">
                        <span>Ship To</span>
                        <span className="text-white">{order.address.substr(0, 10)}...</span>
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Items in the cart */}
                  {order.products.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="w-24">
                        <img src={item.img} width={180} height={180} alt={item.slug}></img>
                      </TableCell>
                      <TableCell className="font-medium flex flex-col gap-2">
                        <span>
                          {item.title} ({item.size}) ({item.color}) x {item.qty}
                        </span>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
