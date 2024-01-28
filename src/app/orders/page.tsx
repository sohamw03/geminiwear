"use client";
import { Button } from "@/shadcn/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/shadcn/components/ui/table";
import React from "react";

export default function Orders() {
  return (
    <main>
      <section className="text-white body-font dark bg-background">
        <div className="container px-5 py-12 mx-auto max-w-2xl xl:max-w-5xl">
          <h1 className="text-2xl mb-4 font-bold">Your orders</h1>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-24"></TableHead>
                  <TableHead className="py-4">
                    <div className="flex flex-col">
                      <span>Order Placed</span>
                      <span className="text-white">29-02-2024</span>
                    </div>
                  </TableHead>
                  <TableHead className="py-4">
                    <div className="flex flex-col">
                      <span>Total</span>
                      <span className="text-white">₹ 2900</span>
                    </div>
                  </TableHead>
                  <TableHead className="py-4">
                    <div className="flex flex-col">
                      <span>Ship To</span>
                      <span className="text-white">Pune</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Items in the cart */}
                {["Object.keys(cart)"].map((_id, index) => (
                  <TableRow key={index}>
                    <TableCell className="w-24"></TableCell>
                    <TableCell className="font-medium flex flex-col gap-2">
                      <span>
                        {"cart[_id].title"} ({"cart[_id].size"}) ({"cart[_id].color"})
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </main>
  );
}
