'use client';

import { ColorOption } from '@/types';
import styles from './ColorSelector.module.scss';

interface ColorSelectorProps {
  options: ColorOption[];
  selected: ColorOption | null;
  onChange: (option: ColorOption) => void;
}

export function ColorSelector({ options, selected, onChange }: ColorSelectorProps) {
  return (
    <div className={styles.container}>
      <p className={styles.label}>COLOR. PICK YOUR FAVOURITE.</p>
      <div className={styles.options} role="group" aria-label="Color options">
        {options.map((option) => {
          const isSelected = selected?.name === option.name;
          return (
            <button
              key={option.name}
              type="button"
              className={`${styles.colorBtn} ${isSelected ? styles.selected : ''}`}
              onClick={() => onChange(option)}
              aria-pressed={isSelected}
              aria-label={`Color: ${option.name}`}
              title={option.name}
            >
              <span
                className={styles.colorSwatch}
                style={{ backgroundColor: option.hexCode }}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
      <p className={styles.colorName}>{selected?.name ?? ''}</p>
    </div>
  );
}
