'use client';

import Image from 'next/image';
import { ProductEntity } from '@/types';
import { BackLink } from '@/components/BackLink/BackLink';
import { StorageSelector } from '@/components/StorageSelector/StorageSelector';
import { ColorSelector } from '@/components/ColorSelector/ColorSelector';
import { SpecsTable } from '@/components/SpecsTable/SpecsTable';
import { ProductGrid } from '@/components/ProductGrid/ProductGrid';
import { useProductActions } from '@/hooks/useProductActions';
import styles from './ProductDetailClient.module.scss';

interface ProductDetailClientProps {
  product: ProductEntity;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const {
    selectedColor,
    selectedStorage,
    added,
    canAdd,
    currentImageUrl,
    currentPrice,
    handleColorChange,
    handleStorageChange,
    handleAddToCart,
  } = useProductActions(product);

  return (
    <div className={styles.container}>
      <BackLink />

      <section className={styles.mainSection} aria-labelledby="product-name">
        <div className={styles.imageCol}>
          <div className={styles.imageWrapper}>
            {currentImageUrl && (
              <Image
                src={currentImageUrl}
                alt={`${product.brand} ${product.name}${selectedColor ? ` in ${selectedColor.name}` : ''}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.productImage}
                priority
              />
            )}
          </div>
        </div>

        <div className={styles.infoCol}>
          <h1 id="product-name" className={styles.productName}>
            {product.name.toUpperCase()}
          </h1>
          <p className={styles.price}>{currentPrice} EUR</p>

          <StorageSelector
            options={product.storageOptions}
            selected={selectedStorage}
            onChange={handleStorageChange}
          />

          <ColorSelector
            options={product.colorOptions}
            selected={selectedColor}
            onChange={handleColorChange}
          />

          <button
            type="button"
            className={`${styles.addBtn} ${canAdd ? styles.addBtnActive : styles.addBtnDisabled}`}
            onClick={handleAddToCart}
            disabled={!canAdd}
            aria-disabled={!canAdd}
          >
            {added ? 'ADDED TO CART ✓' : 'ADD'}
          </button>
        </div>
      </section>

      <div className={styles.specsWrapper}>
        <SpecsTable product={product} />
      </div>

      {product.similarProducts.length > 0 && (
        <section className={styles.similarSection} aria-labelledby="similar-heading">
          <h2 id="similar-heading" className={styles.similarHeading}>
            SIMILAR ITEMS
          </h2>
          <ProductGrid products={product.similarProducts} horizontal />
        </section>
      )}
    </div>
  );
}
