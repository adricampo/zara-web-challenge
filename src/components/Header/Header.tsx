'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.scss';

export function Header() {
  const { getCartCount } = useCart();
  const count = getCartCount();
  const pathname = usePathname();
  const isCartPage = pathname === '/cart';

  return (
    <header className={styles.header} role="banner">
      <nav className={styles.nav} aria-label="Main navigation">
        <Link href="/" className={styles.logo} aria-label="MBST - Go to home">
          <Image
            src="/logo.svg"
            alt="MBST"
            width={80}
            height={24}
            className={styles.logoImage}
            priority
          />
        </Link>

        {!isCartPage && (
          <Link
            href="/cart"
            className={styles.cartLink}
            aria-label={`Shopping cart, ${count} item${count !== 1 ? 's' : ''}`}
          >
            <svg
              className={styles.cartIcon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
              width="24"
              height="24"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {count > 0 && (
              <span className={styles.badge} aria-hidden="true">
                {count}
              </span>
            )}
          </Link>
        )}
      </nav>
    </header>
  );
}
