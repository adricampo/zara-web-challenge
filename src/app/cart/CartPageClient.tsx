'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/CartItem/CartItem';
import styles from './CartPageClient.module.scss';

export function CartPageClient() {
  const { items, removeFromCart, getCartCount, getTotal } = useCart();
  const count = getCartCount();
  const total = getTotal();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>CART ({count})</h1>

      <div className={styles.content}>
        {items.length === 0 ? (
          <p className={styles.emptyMessage}>Your cart is empty.</p>
        ) : (
          <ul className={styles.itemList} aria-label="Cart items">
            {items.map((item) => (
              <li key={item.id}>
                <CartItem item={item} onRemove={removeFromCart} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.footer}>
        {items.length > 0 && (
          <p className={styles.total}>
            TOTAL <span>{total} EUR</span>
          </p>
        )}
        <div className={styles.footerActions}>
          <Link href="/" className={styles.continueBtn}>
            CONTINUE SHOPPING
          </Link>
          {items.length > 0 && (
            <button className={styles.payBtn} type="button">
              PAY
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
