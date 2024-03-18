"use client";
import { SessionProvider, getSession, signOut } from "next-auth/react";
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
  addToCart: ({}: addRemoveItemData, save?: boolean) => void;
  removeFromCart: ({}: addRemoveItemData) => void;
  buyNow: ({}: addRemoveItemData) => void;
  clearCart: () => boolean;
  subTotal: number;
  user: Record<string, any>;
  setUser: React.Dispatch<React.SetStateAction<Object>>;
  logout: () => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getUser: () => any;
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
  const [user, setUser] = useState<Record<string, any>>({ loggedIn: false });
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
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
  const saveCart = (newCart: Record<string, CartItem> | {}) => {
    localStorage.setItem("cart", JSON.stringify(newCart));

    calculateSubTotal(newCart);
  };

  // Add item to cart or update qty by qty if already present
  const addToCart = (itemData: addRemoveItemData, save: boolean = true) => {
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

    setCart(() => newCart);
    if (save) {
      saveCart(newCart);
    }
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

    setCart(() => newCart);
    saveCart(newCart);
  };

  // Buy now add to cart and redirect to checkout
  const buyNow = (itemData: addRemoveItemData) => {
    const { _id, ...withoutIdItemData } = itemData;
    const newCart: Record<string, CartItem> = { _id: { ...withoutIdItemData, qty: 1 } };
    console.log(itemData);
    setCart(() => newCart);
    saveCart(newCart);
  };

  // Empty the cart completely
  const clearCart = () => {
    setCart(() => {
      return {};
    });
    saveCart({});
    console.log("clearCart called");
    return true;
  };

  // Auth logout
  const logout = async () => {
    // Sign out from next-auth
    signOut();
    // Clear user data
    setUser(() => ({ loggedIn: false }));
    // Clear cart
    clearCart();
  };

  // Get user data
  const getUser = async () => {
    try {
      const response = await fetch("/api/auth/getuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseJson = await response.json();

      if (responseJson.success && response.ok) {
        setUser(() => ({ ...responseJson.user, loggedIn: true }));
        return { ...responseJson.user, loggedIn: true };
      } else {
        setUser(() => ({ loggedIn: false }));
      }
    } catch (error) {
      console.log(error);
    }
    return {};
  };

  // Load cart from local storage on reload
  useEffect(() => {
    const loadStateFromLocal = async () => {
      try {
        const data = localStorage.getItem("cart");
        const token = await getSession();

        if (token) {
          setUser(() => ({ ...token.user, loggedIn: true }));
        }

        if (data) {
          setCart(() => JSON.parse(data));
          calculateSubTotal(JSON.parse(data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadStateFromLocal();
  }, []);

  const values: Values = {
    cart,
    addToCart,
    removeFromCart,
    buyNow,
    clearCart,
    subTotal,
    user,
    setUser,
    logout,
    isCartOpen,
    setIsCartOpen,
    getUser,
  };

  return <globalContext.Provider value={values}>{children}</globalContext.Provider>;
}

export function useGlobal() {
  return useContext(globalContext);
}
