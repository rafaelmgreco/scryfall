import { Suspense } from 'react';
import Link from 'next/link';
import { SearchBar } from './search-bar';
import styles from './site-header.module.css';

interface SiteHeaderProps {
  searchValue?: string;
}

export function SiteHeader({ searchValue = '' }: SiteHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brandRow}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandBadge}>H</span>
          <span className={styles.brandText}>
            <strong>HighMarket</strong>
            <small>Cartas e colecoes</small>
          </span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/">Inicio</Link>
          <Link href="/discover">Descobrir</Link>
        </nav>
      </div>

      <div className={styles.searchWrap}>
        <Suspense fallback={<div className={styles.searchFallback} />}>
          <SearchBar initialValue={searchValue} />
        </Suspense>
      </div>
    </header>
  );
}
