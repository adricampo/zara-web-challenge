import { fetchProductById } from '@/services/api';
import { ProductDetailClient } from './ProductDetailClient';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  let product = null;
  try {
    product = await fetchProductById(id);
  } catch (err) {
    const message = err instanceof Error ? err.message : '';
    if (message === 'Not found') {
      notFound();
    }
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
