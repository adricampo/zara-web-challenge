'use client';

import { useEffect, useState } from 'react';
import { fetchProductById } from '@/services/api';
import { ProductEntity } from '@/types';

interface UseProductDetailReturn {
  product: ProductEntity | null;
  loading: boolean;
  error: string | null;
}

export function useProductDetail(id: string): UseProductDetailReturn {
  const [product, setProduct] = useState<ProductEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductById(id);
        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load product');
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, loading, error };
}
