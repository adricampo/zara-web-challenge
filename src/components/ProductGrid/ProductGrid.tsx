'use client';

import { useRef, useState, useCallback } from 'react';
import { ProductListEntity } from '@/types';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './ProductGrid.module.scss';

interface ProductGridProps {
  products: ProductListEntity[];
  horizontal?: boolean;
}

export function ProductGrid({ products, horizontal = false }: ProductGridProps) {
  if (products.length === 0) return null;

  if (!horizontal) {
    return (
      <ul className={styles.grid} aria-label="Product list">
        {products.map((product, index) => (
          <li key={`${product.id}-${index}`}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    );
  }

  return <HorizontalGrid products={products} />;
}

function HorizontalGrid({ products }: { products: ProductListEntity[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [thumbLeft, setThumbLeft] = useState(0);
  const THUMB_WIDTH = 10;

  const handleScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const tl = maxScroll > 0 ? (el.scrollLeft / maxScroll) * (100 - THUMB_WIDTH) : 0;
    setThumbLeft(tl);
  }, []);

  return (
    <div className={styles.horizontalWrapper}>
      <ul
        ref={listRef}
        className={`${styles.grid} ${styles.horizontal}`}
        aria-label="Product list"
        onScroll={handleScroll}
      >
        {products.map((product, index) => (
          <li key={`${product.id}-${index}`}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
      <div className={styles.scrollTrack} aria-hidden="true">
        <div
          className={styles.scrollThumb}
          style={{ width: `${THUMB_WIDTH}%`, left: `${thumbLeft}%` }}
        />
      </div>
    </div>
  );
}
