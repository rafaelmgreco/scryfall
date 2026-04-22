'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';
import styles from './search-bar.module.css';

interface SearchBarProps {
  initialValue?: string;
  placeholder?: string;
}

export function SearchBar({
  initialValue = '',
  placeholder = 'Procure por nome, texto da carta ou filtros como t:dragon',
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const resolvedValue =
    pathname === '/search' ? (searchParams.get('q') ?? '') : initialValue;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = String(formData.get('q') ?? '').trim();

    if (query.length === 0) {
      router.push('/search');
      return;
    }

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        defaultValue={resolvedValue}
        key={resolvedValue}
        name="q"
        placeholder={placeholder}
        aria-label="Pesquisar cartas"
      />
      <button className={styles.button} type="submit">
        Buscar
      </button>
    </form>
  );
}
