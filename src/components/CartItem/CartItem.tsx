'use client';

import Image from 'next/image';
import { CartItem as CartItemType } from '@/types';
import styles from './CartItem.module.scss';

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
}

export function CartItem({ item, onRemove }: CartItemProps) {
  return (
    <article className={styles.item} aria-label={`${item.brand} ${item.name}`}>
      <div className={styles.imageContainer}>
        <Image
          src={item.imageUrl}
          alt={`${item.brand} ${item.name}`}
          fill
          sizes="80px"
          className={styles.image}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.name}>
          {item.brand} {item.name}
        </p>
        <p className={styles.specs}>
          {item.selectedStorage.capacity} | {item.selectedColor.name}
        </p>
        <p className={styles.price}>{item.price} EUR</p>
        <button
          type="button"
          className={styles.removeBtn}
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.brand} ${item.name} from cart`}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
