import { fetchProducts } from '@/services/api';
import { ProductListingClient } from './ProductListingClient';
import { ProductListEntity } from '@/types';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let initialProducts: ProductListEntity[] = [];
  let initialError: string | null = null;

  try {
    initialProducts = await fetchProducts({ limit: 20 });
  } catch (err) {
    initialError = err instanceof Error ? err.message : 'Failed to load products';
  }

  return <ProductListingClient initialProducts={initialProducts} initialError={initialError} />;
}
