'use client';

import { StorageOption } from '@/types';
import styles from './StorageSelector.module.scss';

interface StorageSelectorProps {
  options: StorageOption[];
  selected: StorageOption | null;
  onChange: (option: StorageOption) => void;
}

export function StorageSelector({ options, selected, onChange }: StorageSelectorProps) {
  return (
    <div className={styles.container}>
      <p className={styles.label}>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</p>
      <div className={styles.options} role="group" aria-label="Storage options">
        {options.map((option) => {
          const isSelected = selected?.capacity === option.capacity;
          return (
            <button
              key={option.capacity}
              type="button"
              className={`${styles.option} ${isSelected ? styles.selected : ''}`}
              onClick={() => onChange(option)}
              aria-pressed={isSelected}
              aria-label={`${option.capacity} - ${option.price} EUR`}
            >
              {option.capacity}
            </button>
          );
        })}
      </div>
    </div>
  );
}
