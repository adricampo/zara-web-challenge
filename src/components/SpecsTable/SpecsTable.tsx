import { ProductEntity } from '@/types';
import styles from './SpecsTable.module.scss';

interface SpecsTableProps {
  product: ProductEntity;
}

type SpecRow = { label: string; value: string };

export function SpecsTable({ product }: SpecsTableProps) {
  const rows: SpecRow[] = [
    { label: 'BRAND', value: product.brand },
    { label: 'NAME', value: product.name },
    { label: 'DESCRIPTION', value: product.description },
    { label: 'SCREEN', value: product.specs.screen },
    { label: 'RESOLUTION', value: product.specs.resolution },
    { label: 'PROCESSOR', value: product.specs.processor },
    { label: 'MAIN CAMERA', value: product.specs.mainCamera },
    { label: 'SELFIE CAMERA', value: product.specs.selfieCamera },
    { label: 'BATTERY', value: product.specs.battery },
    { label: 'OS', value: product.specs.os },
    { label: 'SCREEN REFRESH RATE', value: product.specs.screenRefreshRate },
  ];

  return (
    <section className={styles.section} aria-labelledby="specs-heading">
      <h2 id="specs-heading" className={styles.heading}>
        SPECIFICATIONS
      </h2>
      <dl className={styles.table}>
        {rows.map(({ label, value }) => (
          <div key={label} className={styles.row}>
            <dt className={styles.label}>{label}</dt>
            <dd className={styles.value}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
