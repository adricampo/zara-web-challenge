'use client';

import { useId } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  total: number;
  loading?: boolean;
}

export function SearchBar({ value, onChange, total, loading = false }: SearchBarProps) {
  const inputId = useId();

  return (
    <div className={styles.container} role="search">
      <label htmlFor={inputId} className="visually-hidden">
        Search for a smartphone
      </label>
      <input
        id={inputId}
        type="search"
        className={styles.input}
        placeholder="Search for a smartphone..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search for a smartphone"
        autoComplete="off"
      />
      <p
        className={styles.results}
        aria-live="polite"
        aria-atomic="true"
        aria-label={`${loading ? 'Loading' : total} results`}
      >
        {loading ? 'LOADING...' : `${total} RESULTS`}
      </p>
    </div>
  );
}
