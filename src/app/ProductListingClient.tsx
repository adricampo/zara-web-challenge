'use client';

import { useEffect, useState } from 'react';
import { ProductListEntity } from '@/types';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { ProductGrid } from '@/components/ProductGrid/ProductGrid';
import { useDebounce } from '@/hooks/useDebounce';
import styles from './ProductListingClient.module.scss';

interface ProductListingClientProps {
  initialProducts: ProductListEntity[];
  initialError: string | null;
}

async function searchProducts(search: string): Promise<ProductListEntity[]> {
  const params = new URLSearchParams({ limit: '20' });
  if (search) params.set('search', search);
  const res = await fetch(`/api/products?${params}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status}`);
  }
  return res.json();
}

export function ProductListingClient({ initialProducts, initialError }: ProductListingClientProps) {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<ProductListEntity[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (isFirstLoad && debouncedSearch === '') {
      setIsFirstLoad(false);
      return;
    }
    setIsFirstLoad(false);

    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchProducts(debouncedSearch);
        if (!cancelled) setProducts(data);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load products');
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.container}>
      <SearchBar value={search} onChange={setSearch} total={products.length} loading={loading} />
      {error && (
        <p className={styles.error} role="alert">
          Error: {error}
        </p>
      )}
      {!error && <ProductGrid products={products} />}
    </div>
  );
}
