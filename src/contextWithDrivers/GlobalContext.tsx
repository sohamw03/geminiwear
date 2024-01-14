"use client";
import { createContext, useContext, useEffect, useState } from "react";

// Types
interface CartItem {
  title: string;
  slug: string;
  desc: string;
  img: string;
  category: string;
  size: string;
  color: string;
  price: number;
  qty: number;
}

export interface Values {
  cart: Record<string, CartItem>;
  addToCart: ({}: addRemoveItemData) => void;
  removeFromCart: ({}: addRemoveItemData) => void;
  clearCart: () => boolean;
  subTotal: number;
}

export interface addRemoveItemData {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  img: string;
  category: string;
  size: string;
  color: string;
  price: number;
  qty: number;
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

  // Add item to cart or update qty by qty if already present
  const addToCart = (itemData: addRemoveItemData) => {
    const newCart: Record<string, CartItem> = { ...cart };
    console.log(itemData);
    if (itemData._id in newCart) {
      // Update qty of existing item
      newCart[itemData._id].qty += itemData.qty;
      // Update size and color of existing item
      newCart[itemData._id].size = itemData.size;
      newCart[itemData._id].color = itemData.color;
    } else {
      // Add new item to cart
      if (itemData.qty > 0) {
        newCart[itemData._id] = { ...itemData, qty: 1 };
      }
    }

    setCart(newCart);
    saveCart(newCart);
  };

  // Remove item from cart if qty is 0
  const removeFromCart = (itemData: addRemoveItemData) => {
    const newCart: Record<string, CartItem> = { ...cart };

    if (itemData._id in newCart) {
      newCart[itemData._id].qty -= itemData.qty;

      if (newCart[itemData._id].qty <= 0) {
        delete newCart[itemData._id];
      }
    }

    setCart(newCart);
    saveCart(newCart);
  };

  // Empty the cart completely
  const clearCart = () => {
    setCart({});
    saveCart({});
    return true;
  };

  // Load cart from local storage on reload
  useEffect(() => {
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
