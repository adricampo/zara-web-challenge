'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CartItem, ColorOption, StorageOption } from '@/types';

const CART_STORAGE_KEY = 'zara_cart';

interface AddToCartPayload {
  productId: string;
  name: string;
  brand: string;
  selectedColor: ColorOption;
  selectedStorage: StorageOption;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (payload: AddToCartPayload) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getTotal: () => number;
}

const CartContext = createContext<CartContextValue | null>(null);

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        setItems(parsed);
      }
    } catch {
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
    }
  }, [items, hydrated]);

  const addToCart = useCallback((payload: AddToCartPayload) => {
    const newItem: CartItem = {
      id: generateId(),
      productId: payload.productId,
      name: payload.name,
      brand: payload.brand,
      imageUrl: payload.selectedColor.imageUrl,
      selectedColor: payload.selectedColor,
      selectedStorage: payload.selectedStorage,
      price: payload.selectedStorage.price,
    };
    setItems((prev) => [...prev, newItem]);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getCartCount = useCallback(() => {
    return items.length;
  }, [items]);

  const getTotal = useCallback(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addToCart,
      removeFromCart,
      clearCart,
      getCartCount,
      getTotal,
    }),
    [items, addToCart, removeFromCart, clearCart, getCartCount, getTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}