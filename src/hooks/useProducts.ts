'use client';

import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '@/services/api';
import { ProductListEntity } from '@/types';
import { useDebounce } from './useDebounce';

interface UseProductsOptions {
  initialSearch?: string;
  limit?: number;
}

interface UseProductsReturn {
  products: ProductListEntity[];
  loading: boolean;
  error: string | null;
  total: number;
  search: string;
  setSearch: (search: string) => void;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const { limit = 20 } = options;
  const [search, setSearch] = useState(options.initialSearch ?? '');
  const [products, setProducts] = useState<ProductListEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts({ search: debouncedSearch || undefined, limit });
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, limit]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, loading, error, total: products.length, search, setSearch };
}
