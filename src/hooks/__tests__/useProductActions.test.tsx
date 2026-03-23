import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { useProductActions } from '../useProductActions';
import { CartProvider } from '@/context/CartContext';
import { ProductEntity } from '@/types';

const mockProduct: ProductEntity = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone 15',
  description: 'The latest iPhone',
  basePrice: 999,
  rating: 4.5,
  specs: {
    screen: '6.1"',
    resolution: '2556x1179',
    processor: 'A16 Bionic',
    mainCamera: '48MP',
    selfieCamera: '12MP',
    battery: '3279mAh',
    os: 'iOS 17',
    screenRefreshRate: '60Hz',
  },
  colorOptions: [
    { name: 'Black', hexCode: '#000000', imageUrl: 'https://example.com/black.jpg' },
    { name: 'White', hexCode: '#ffffff', imageUrl: 'https://example.com/white.jpg' },
  ],
  storageOptions: [
    { capacity: '128 GB', price: 999 },
    { capacity: '256 GB', price: 1099 },
  ],
  similarProducts: [],
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('useProductActions', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns null selections and added=false on init', () => {
    const { result } = renderHook(() => useProductActions(mockProduct), { wrapper });

    expect(result.current.selectedColor).toBeNull();
    expect(result.current.selectedStorage).toBeNull();
    expect(result.current.added).toBe(false);
    expect(result.current.canAdd).toBe(false);
  });

  it('uses the first color image as default currentImageUrl', () => {
    const { result } = renderHook(() => useProductActions(mockProduct), { wrapper });

    expect(result.current.currentImageUrl).toBe('https://example.com/black.jpg');
  });

  it('uses basePrice as default currentPrice', () => {
    const { result } = renderHook(() => useProductActions(mockProduct), { wrapper });

    expect(result.current.currentPrice).toBe(999);
  });

  it('handleColorChange updates selectedColor and resets added', () => {
    const { result } = renderHook(() => useProductActions(mockProduct), { wrapper });

    act(() => {
      result.current.handleStorageChange(mockProduct.storageOptions[0]);
    });
    act(() => {
      result.current.handleColorChange(mockProduct.colorOptions[0]);
    });
    act(() => {
      result.current.handleAddToCart();
    });
    expect(result.current.added).toBe(true);

    act(() => {
      result.current.handleColorChange(mockProduct.colorOptions[1]);
    });

    expect(result.current.selectedColor).toEqual(mockProduct.colorOptions[1]);
    expect(result.current.added).toBe(false);
  });

  it('handleColorChange updates currentImageUrl', () => {
    const { result } = renderHook(() => useProductActions(mockProduct), { wrapper });

    act(() => {
      result.current.handleColorChange(mockProduct.colorOptions[1]);
    });

    expect(result.current.currentImageUrl).toBe('https://example.com/white.jpg');
  });

  it('handleStorageChange updates selectedStorage and resets added', () => {
    const { result } = renderHook(() => useProductActions(mockProduct), { wrapper });

    act(() => {
      result.current.handleColorChange(mockProduct.colorOptions[0]);
    });
    act(() => {
      result.current.handleStorageChange(mockProduct.storageOptions[0]);
    });
    act(() => {
      result.current.handleAddToCart();
    });
    expect(result.current.added).toBe(true);

    act(() => {
      result.current.handleStorageChange(mockProduct.storageOptions[1]);
    });

    expect(result.current.selectedStorage).toEqual(mockProduct.storageOptions[1]);
    expect(result.current.added).toBe(false);
  });

  it('handleStorageChange updates currentPrice', () => {
    const { result } = renderHook(() => useProductActions(mockProduct), { wrapper });

    act(() => {
      result.current.handleStorageChange(mockProduct.storageOptions[1]);
    });

    expect(result.current.currentPrice).toBe(1099);
  });

  it('canAdd is false when only color is selected', () => {
    const { result } = renderHook(() => useProductActions(mockProduct), { wrapper });

    act(() => {
      result.current.handleColorChange(mockProduct.colorOptions[0]);
    });

    expect(result.current.canAdd).toBe(false);
  });

  it('canAdd is false when only storage is selected', () => {
    const { result } = renderHook(() => useProductActions(mockProduct), { wrapper });

    act(() => {
      result.current.handleStorageChange(mockProduct.storageOptions[0]);
    });

    expect(result.current.canAdd).toBe(false);
  });

  it('canAdd is true when both color and storage are selected', () => {
    const { result } = renderHook(() => useProductActions(mockProduct), { wrapper });

    act(() => {
      result.current.handleColorChange(mockProduct.colorOptions[0]);
      result.current.handleStorageChange(mockProduct.storageOptions[0]);
    });

    expect(result.current.canAdd).toBe(true);
  });

  it('handleAddToCart does nothing when canAdd is false', () => {
    const { result } = renderHook(() => useProductActions(mockProduct), { wrapper });

    act(() => {
      result.current.handleAddToCart();
    });

    expect(result.current.added).toBe(false);
  });

  it('handleAddToCart sets added=true and calls addToCart when canAdd is true', () => {
    const { result } = renderHook(() => useProductActions(mockProduct), { wrapper });

    act(() => {
      result.current.handleColorChange(mockProduct.colorOptions[0]);
      result.current.handleStorageChange(mockProduct.storageOptions[0]);
    });
    act(() => {
      result.current.handleAddToCart();
    });

    expect(result.current.added).toBe(true);
  });
});
