import Link from 'next/link';
import Image from 'next/image';
import { ProductListEntity } from '@/types';
import styles from './ProductCard.module.scss';

interface ProductCardProps {
  product: ProductListEntity;
}

export function ProductCard({ product }: ProductCardProps) {
  const { id, brand, name, basePrice, imageUrl } = product;

  return (
    <article className={styles.card}>
      <Link href={`/product/${id}`} className={styles.link} aria-label={`${brand} ${name} - ${basePrice} EUR`}>
        <div className={styles.cardInner}>
          <div className={styles.imageContainer}>
            <Image
              src={imageUrl}
              alt={`${brand} ${name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1920px) 50vw, 25vw"
              className={styles.image}
              loading="lazy"
            />
          </div>
          <div className={styles.info}>
            <p className={styles.brand}>{brand.toUpperCase()}</p>
            <div className={styles.topRow}>
              <p className={styles.name}>{name.toUpperCase()}</p>
              <span className={styles.price}>{basePrice} EUR</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
