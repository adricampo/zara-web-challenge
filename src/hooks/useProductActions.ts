'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ColorOption, ProductEntity, StorageOption } from '@/types';

interface UseProductActionsReturn {
  selectedColor: ColorOption | null;
  selectedStorage: StorageOption | null;
  added: boolean;
  canAdd: boolean;
  currentImageUrl: string;
  currentPrice: number;
  handleColorChange: (color: ColorOption) => void;
  handleStorageChange: (storage: StorageOption) => void;
  handleAddToCart: () => void;
}

export function useProductActions(product: ProductEntity): UseProductActionsReturn {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null);
  const [added, setAdded] = useState(false);

  const currentImageUrl = selectedColor?.imageUrl ?? product.colorOptions[0]?.imageUrl ?? '';
  const currentPrice = selectedStorage?.price ?? product.basePrice;
  const canAdd = selectedColor !== null && selectedStorage !== null;

  const handleColorChange = (color: ColorOption) => {
    setSelectedColor(color);
    setAdded(false);
  };

  const handleStorageChange = (storage: StorageOption) => {
    setSelectedStorage(storage);
    setAdded(false);
  };

  const handleAddToCart = () => {
    if (!canAdd) return;
    addToCart({
      productId: product.id,
      name: product.name,
      brand: product.brand,
      selectedColor: selectedColor!,
      selectedStorage: selectedStorage!,
    });
    setAdded(true);
  };

  return {
    selectedColor,
    selectedStorage,
    added,
    canAdd,
    currentImageUrl,
    currentPrice,
    handleColorChange,
    handleStorageChange,
    handleAddToCart,
  };
}
