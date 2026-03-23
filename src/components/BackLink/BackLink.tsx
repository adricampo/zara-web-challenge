'use client';

import { useRouter } from 'next/navigation';
import styles from './BackLink.module.scss';

export function BackLink() {
  const router = useRouter();

  return (
    <button
      type="button"
      className={styles.backLink}
      onClick={() => router.back()}
      aria-label="Go back to previous page"
    >
      &lt; BACK
    </button>
  );
}
