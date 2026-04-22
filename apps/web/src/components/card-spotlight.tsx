import Image from 'next/image';
import Link from 'next/link';
import { ManaCost, OracleText } from '@/components/mana-symbols';
import { getCardImage, getCardOracleText } from '@/lib/scryfall';
import { ScryfallCard } from '@/lib/types';
import styles from './card-spotlight.module.css';

interface CardSpotlightProps {
  card: ScryfallCard;
  eyebrow?: string;
}

export function CardSpotlight({ card, eyebrow }: CardSpotlightProps) {
  const image = getCardImage(card);

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        {image ? (
          <Image
            alt={card.name}
            className={styles.image}
            fill
            priority
            sizes="(max-width: 960px) 100vw, 340px"
            src={image}
          />
        ) : (
          <div className={styles.fallback}>{card.name}</div>
        )}
      </div>

      <div className={styles.body}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}

        <div className={styles.header}>
          <div>
            <h3>{card.name}</h3>
            <p className={styles.type}>
              {card.type_line ?? 'Tipo nao informado'}
            </p>
          </div>
          {card.mana_cost && (
            <span className={styles.mana}>
              <ManaCost cost={card.mana_cost} size="large" />
            </span>
          )}
        </div>

        {getCardOracleText(card) ? (
          <OracleText className={styles.text} text={getCardOracleText(card)!} />
        ) : (
          <p className={styles.text}>Sem texto de regras disponivel.</p>
        )}

        <div className={styles.meta}>
          <span>{card.set_name ?? card.set?.toUpperCase() ?? 'Colecao'}</span>
          <span>{card.rarity ?? 'raridade n/a'}</span>
        </div>

        <div className={styles.links}>
          <Link className={styles.link} href={`/card/${card.id}`}>
            Abrir detalhe da carta
          </Link>

          {card.scryfall_uri && (
            <a
              className={styles.linkSecondary}
              href={card.scryfall_uri}
              rel="noreferrer"
              target="_blank"
            >
              Abrir fonte original
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
