"use client";

import { Values, useGlobal } from "@/contextWithDrivers/GlobalContext";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PincodeForm() {
  const [serviceable, setServiceable] = useState(-1);

  const handlePincode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pincode = e.currentTarget.pincode.value;
    console.log(pincode);
    const pins = await fetch(`http://localhost:3000/api/pincode?p=${pincode}`, { method: "GET" });
    const pinJson = await pins.json();
    if (pinJson.serviceablePincodes.includes(pincode)) {
      setServiceable(1);
    } else {
      setServiceable(0);
    }
  };

  return (
    <form className="flex flex-col border-b-2 mb-5 pb-5 gap-2" onSubmit={handlePincode}>
      <div className="flex flex-row gap-2">
        <Input type="text" name="pincode" placeholder="Enter Delivery Pincode" className="max-w-xs" />
        <Button variant={"secondary"} type="submit">
          Check
        </Button>
      </div>
      {serviceable !== -1 ? <p className={`ml-1`}>{serviceable === 1 ? "Item is Deliverable to your location." : "Sorry! this item is not deliverable to your location."}</p> : null}
    </form>
  );
}

export function SizeColorChooser({ product }: any) {
  // Global context
  const { addToCart }: Values = useGlobal();

  const [size, setSize] = useState(product.size[0]);
  const [color, setColor] = useState(product.color[0]);

  const pathname = usePathname();
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const paramsize = params.get("size");
    const paramcolor = params.get("color");
    if (paramsize) {
      setSize(paramsize);
    }
    if (paramcolor) {
      setColor(paramcolor);
    }
  }, []);

  useEffect(() => {
    router.push(`${pathname}?size=${size}&color=${color}`);
    addToCart({ ...product, size: size, color: color, qty: 0 }, false);
  }, [size, color]);

  return (
    <div className="flex mt-6 pb-5 items-center border-gray-900">
      <div className="flex">
        <span className="mr-3">Color</span>
        {product.color.map((c: string, index: number) => {
          return <button key={index} onClick={() => setColor(c)} className={`border-4 ml-1 rounded-full w-6 h-6 focus:outline-none`} style={{ backgroundColor: c.toLowerCase(), borderColor: color === c ? "white" : "rgb(55, 65, 81)" }}></button>;
        })}
      </div>
      <div className="flex ml-6 items-center">
        <span className="mr-3">Size</span>
        <Select
          onValueChange={(value) => {
            setSize(value);
          }}
          value={size}>
          <SelectTrigger className="w-[4.5rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {product.size.map((s: string, index: number) => {
              return (
                <SelectItem key={index} value={s}>
                  {s}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export function AddToCartBtn({ product }: any) {
  // Global context
  const { addToCart, removeFromCart, buyNow, cart }: Values = useGlobal();

  // Local states
  const [quantity, setQuantity] = useState(0);

  // Search params for size and color
  const params = useSearchParams();
  let size = params.get("size");
  let color = params.get("color");

  const router = useRouter();

  const handleAddRemToCart = async (flag: 1 | -1) => {
    if (flag === 1 && quantity < product.availableQty) {
      setQuantity((q) => q + 1);
      addToCart({ ...product, size: size, color: color, qty: 1 });
    }
    if (flag === -1 && quantity > 0) {
      setQuantity((q) => q - 1);
      removeFromCart({ ...product, size: size, color: color, qty: 1 });
    }
  };

  const handleBuyNow = () => {
    buyNow({ ...product, size: size, color: color, qty: 1 });
    router.push("/checkout");
  };

  useEffect(() => {
    cart[product._id] ? setQuantity(cart[product._id].qty) : setQuantity(0);
    size = params.get("size");
    color = params.get("color");
  }, [cart]);

  return (
    <>
      <Button variant={"default"} className="ml-auto w-[calc(6.2rem+3ch)]" onClick={handleBuyNow}>
        Buy Now
      </Button>
      {quantity === 0 ? (
        <Button variant={"default"} className="ml-4 w-[calc(6.2rem+3ch)]" onClick={() => handleAddRemToCart(1)}>
          Add to Cart
        </Button>
      ) : (
        <div className="ml-4 inline-flex flex-row justify-between items-center gap-2">
          <Button variant={"default"} onClick={() => handleAddRemToCart(-1)}>
            -
          </Button>
          <span className="text-gray-100 w-[3ch] text-center">{quantity}</span>
          <Button variant={"default"} onClick={() => handleAddRemToCart(1)}>
            +
          </Button>
        </div>
      )}
    </>
  );
}
