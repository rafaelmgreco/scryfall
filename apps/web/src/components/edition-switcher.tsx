'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCardImage } from '@/lib/scryfall';
import { ScryfallCard } from '@/lib/types';
import styles from './edition-switcher.module.css';

interface EditionSwitcherProps {
  currentCardId: string;
  currentSet?: string;
  editions: ScryfallCard[];
  setIcons?: Record<string, string>;
}

function formatPrintMeta(card: ScryfallCard) {
  const items = [
    card.collector_number ? `#${card.collector_number}` : null,
    card.rarity ?? null,
    card.released_at ?? null,
    card.lang && card.lang !== 'en' ? card.lang.toUpperCase() : null,
    card.digital ? 'digital' : 'paper',
  ];

  return items.filter(Boolean) as string[];
}

export function EditionSwitcher({
  currentCardId,
  currentSet,
  editions,
  setIcons = {},
}: EditionSwitcherProps) {
  const [hoveredEditionId, setHoveredEditionId] = useState<string | null>(null);

  const currentEdition =
    editions.find((edition) => edition.id === currentCardId) ?? editions[0];

  const previewEdition = useMemo(() => {
    if (!hoveredEditionId) {
      return currentEdition;
    }

    return (
      editions.find((edition) => edition.id === hoveredEditionId) ?? currentEdition
    );
  }, [currentEdition, editions, hoveredEditionId]);

  if (editions.length <= 1 || !currentEdition) {
    return null;
  }

  const previewImage = getCardImage(previewEdition);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <p className={styles.label}>Edicoes e prints</p>
          <h2 className={styles.title}>Veja outras versoes desta carta</h2>
        </div>
        <p className={styles.subtitle}>
          Passe o mouse para ver o preview e clique para abrir aquela edicao.
        </p>
      </div>

      <div className={styles.content}>
        <div
          className={styles.list}
          onMouseLeave={() => setHoveredEditionId(null)}
        >
          {editions.map((edition) => {
            const isCurrent = edition.id === currentCardId;
            const isPreviewing = edition.id === previewEdition.id;

            return (
              <Link
                className={[
                  styles.row,
                  isCurrent ? styles.currentRow : '',
                  isPreviewing ? styles.previewingRow : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                href={`/card/${edition.id}`}
                key={edition.id}
                onMouseEnter={() => setHoveredEditionId(edition.id)}
              >
                <div className={styles.rowMain}>
                  <div className={styles.rowHeading}>
                    <span className={styles.setName}>
                      {edition.set && setIcons[edition.set] && (
                        <Image
                          alt={edition.set?.toUpperCase() ?? 'Set'}
                          className={styles.setIcon}
                          height={18}
                          src={setIcons[edition.set]}
                          width={18}
                        />
                      )}
                      {edition.set_name ?? edition.set?.toUpperCase() ?? 'Colecao'}
                    </span>
                    <span className={styles.setCode}>
                      {edition.set?.toUpperCase() ?? currentSet ?? 'SET'}
                    </span>
                  </div>

                  <div className={styles.meta}>
                    {formatPrintMeta(edition).map((item) => (
                      <span key={`${edition.id}-${item}`}>{item}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.rowAside}>
                  {isCurrent && <span className={styles.badge}>Atual</span>}
                </div>
              </Link>
            );
          })}
        </div>

        <aside className={styles.previewPanel}>
          <div className={styles.previewFrame}>
            {previewImage ? (
              <Image
                alt={previewEdition.name}
                className={styles.previewImage}
                fill
                sizes="(max-width: 860px) 240px, 280px"
                src={previewImage}
              />
            ) : (
              <div className={styles.previewFallback}>{previewEdition.name}</div>
            )}
          </div>

          <div className={styles.previewMeta}>
            <p className={styles.previewSet}>
              {previewEdition.set_name ??
                previewEdition.set?.toUpperCase() ??
                'Colecao'}
            </p>
            <p className={styles.previewText}>
              {previewEdition.collector_number
                ? `Numero ${previewEdition.collector_number}`
                : 'Numero indisponivel'}
              {previewEdition.released_at
                ? ` · ${previewEdition.released_at}`
                : ''}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
