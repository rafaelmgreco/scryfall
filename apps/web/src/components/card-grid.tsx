import Image from 'next/image';
import Link from 'next/link';
import { getCardImage } from '@/lib/scryfall';
import { ScryfallCard } from '@/lib/types';
import styles from './card-grid.module.css';

interface CardGridProps {
  cards: ScryfallCard[];
}

export function CardGrid({ cards }: CardGridProps) {
  return (
    <div className={styles.grid}>
      {cards.map((card) => {
        const image = getCardImage(card);

        return (
          <Link className={styles.card} href={`/card/${card.id}`} key={card.id}>
            <div className={styles.imageWrap}>
              {image ? (
                <Image
                  alt={card.name}
                  className={styles.image}
                  fill
                  sizes="(max-width: 900px) 50vw, 180px"
                  src={image}
                />
              ) : (
                <div className={styles.fallback}>{card.name}</div>
              )}
            </div>

            <div className={styles.body}>
              <h3>{card.name}</h3>
              <p>{card.type_line ?? 'Tipo nao informado'}</p>
              <span>
                {card.set_name ?? card.set?.toUpperCase() ?? 'Colecao'}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
