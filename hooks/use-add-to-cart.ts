"use client";

import { useCart } from "@/context/cart-context";
import { useCallback } from "react";
import { toast } from "sonner";

export function useAddToCart() {
  const { addItem } = useCart();

  const addToCart = useCallback((item: {
    id: string;
    name: string;
    type: 'venue' | 'vendor';
    price: number;
    image?: string;
  }) => {
    addItem(item);
    toast.success(`${item.name} added to cart!`);
  }, [addItem]);

  return { addToCart };
}
