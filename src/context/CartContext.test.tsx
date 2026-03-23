import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { CartProvider, useCart } from './CartContext';

const mockColor = { name: 'Black', hexCode: '#000000', imageUrl: 'https://example.com/black.jpg' };
const mockStorage = { capacity: '128 GB', price: 999 };

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('starts with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.getCartCount()).toBe(0);
    expect(result.current.getTotal()).toBe(0);
  });

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        productId: '1',
        name: 'iPhone 15',
        brand: 'Apple',
        selectedColor: mockColor,
        selectedStorage: mockStorage,
      });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].name).toBe('iPhone 15');
    expect(result.current.items[0].price).toBe(999);
    expect(result.current.getCartCount()).toBe(1);
  });

  it('adds multiple items to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        productId: '1',
        name: 'iPhone 15',
        brand: 'Apple',
        selectedColor: mockColor,
        selectedStorage: mockStorage,
      });
      result.current.addToCart({
        productId: '2',
        name: 'Samsung Galaxy',
        brand: 'Samsung',
        selectedColor: mockColor,
        selectedStorage: { capacity: '256 GB', price: 1199 },
      });
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.getCartCount()).toBe(2);
    expect(result.current.getTotal()).toBe(2198);
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        productId: '1',
        name: 'iPhone 15',
        brand: 'Apple',
        selectedColor: mockColor,
        selectedStorage: mockStorage,
      });
    });

    const itemId = result.current.items[0].id;

    act(() => {
      result.current.removeFromCart(itemId);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.getCartCount()).toBe(0);
  });

  it('clears cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        productId: '1',
        name: 'iPhone 15',
        brand: 'Apple',
        selectedColor: mockColor,
        selectedStorage: mockStorage,
      });
      result.current.addToCart({
        productId: '2',
        name: 'Galaxy',
        brand: 'Samsung',
        selectedColor: mockColor,
        selectedStorage: mockStorage,
      });
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('calculates total correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        productId: '1',
        name: 'iPhone 15',
        brand: 'Apple',
        selectedColor: mockColor,
        selectedStorage: { capacity: '256 GB', price: 1199 },
      });
      result.current.addToCart({
        productId: '2',
        name: 'Galaxy',
        brand: 'Samsung',
        selectedColor: mockColor,
        selectedStorage: { capacity: '128 GB', price: 799 },
      });
    });

    expect(result.current.getTotal()).toBe(1998);
  });

  it('persists cart to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        productId: '1',
        name: 'iPhone 15',
        brand: 'Apple',
        selectedColor: mockColor,
        selectedStorage: mockStorage,
      });
    });

    const stored = localStorage.getItem('zara_cart');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed).toHaveLength(1);
    expect(parsed[0].name).toBe('iPhone 15');
  });

  it('throws error when used outside CartProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useCart())).toThrow('useCart must be used within a CartProvider');
    consoleSpy.mockRestore();
  });
});
