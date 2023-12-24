"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Types
interface CartItem {
  qty: number;
  price: number;
  name: string;
  size: string;
  variant: string;
}

export interface Values {
  cart: Record<string, CartItem>;
  addToCart: ({}: addRemoveItemData) => void;
  removeFromCart: ({}: addRemoveItemData) => void;
  clearCart: () => void;
  subTotal: number;
}

export interface addRemoveItemData {
  itemCode: string;
  qty: number;
  price: number;
  name: string;
  size: string;
  variant: string;
}

const globalContext = createContext<Values>({} as Values);

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {
  // Global states
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [subTotal, setSubTotal] = useState<number>(0);

  // Calulate subtotal
  const calculateSubTotal = (data: Record<string, CartItem>) => {
    let subt = 0;
    for (let i = 0; i < Object.keys(data).length; i++) {
      const currentItem = data[Object.keys(data)[i]];
      subt += currentItem.qty * currentItem.price;
    }
    setSubTotal(subt);
  };

  // Save cart to local storage
  const saveCart = (newCart: Record<string, CartItem>) => {
    localStorage.setItem("cart", JSON.stringify(newCart));

    calculateSubTotal(newCart);
  };

  // Add item to cart
  const addToCart = ({ itemCode, qty, price, name, size, variant }: addRemoveItemData) => {
    const data: any = {
      itemCode,
      qty,
      price,
      name,
      size,
      variant,
    };
    const newCart: Record<string, CartItem> = { ...cart };

    if (itemCode in newCart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = { ...data, qty: 1 };
    }

    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = ({ itemCode, qty, price, name, size, variant }: addRemoveItemData) => {
    const newCart: Record<string, CartItem> = { ...cart };

    if (itemCode in newCart) {
      newCart[itemCode].qty -= qty;

      if (newCart[itemCode].qty <= 0) {
        delete newCart[itemCode];
      }
    }

    setCart(newCart);
    saveCart(newCart);
  };

  // Empty the cart completely
  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  // Load cart from local storage on reload
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ "14230798": { qty: 2, price: 899, name: "Monte Carlo Red Festive Collection", size: "M", variant: "Black" } }));
    try {
      const data = localStorage.getItem("cart");
      if (data) {
        setCart(JSON.parse(data));
        calculateSubTotal(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
    console.log({ cart, subTotal });
  }, []);

  const values: Values = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    subTotal,
  };

  return <globalContext.Provider value={values}>{children}</globalContext.Provider>;
}

export function useGlobal() {
  return useContext(globalContext);
}
