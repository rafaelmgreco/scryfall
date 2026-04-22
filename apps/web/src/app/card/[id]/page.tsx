import Link from 'next/link';
import { CardSpotlight } from '@/components/card-spotlight';
import { EditionSwitcher } from '@/components/edition-switcher';
import { getCardById, getCardPrints, getSetByCode } from '@/lib/scryfall';
import styles from './card-detail.module.css';

interface CardDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const RELEVANT_FORMATS = [
  'standard',
  'pioneer',
  'modern',
  'legacy',
  'vintage',
  'commander',
];

export default async function CardDetailPage({ params }: CardDetailPageProps) {
  const { id } = await params;
  const card = await getCardById(id);
  const printResults = card.oracle_id
    ? await getCardPrints(card.oracle_id)
    : null;
  const editions =
    printResults?.data.filter(
      (edition) =>
        edition.name === card.name &&
        edition.digital === card.digital,
    ) ?? [];
  const uniqueSetCodes = [...new Set(editions.map((edition) => edition.set).filter(Boolean))];
  const sets = await Promise.all(
    uniqueSetCodes.map((code) => getSetByCode(code!)),
  );
  const setIcons = Object.fromEntries(
    sets
      .filter((set) => set.code && set.icon_svg_uri)
      .map((set) => [set.code, set.icon_svg_uri!]),
  );

  const visibleLegalities = RELEVANT_FORMATS.filter((format) => {
    const legality = card.legalities?.[format];
    return legality && legality !== 'not_legal';
  });

  return (
    <main className={styles.page}>
      <section className={styles.breadcrumbs}>
        <Link href="/">Inicio</Link>
        <span>/</span>
        <Link href="/discover">Descobrir</Link>
        <span>/</span>
        <strong>{card.name}</strong>
      </section>

      <section className={styles.hero}>
        <div className={styles.heroHeader}>
          <div>
            <p className={styles.kicker}>Carta em detalhe</p>
            <h1>{card.name}</h1>
            <p className={styles.subline}>
              {card.set_name ?? 'Colecao desconhecida'}
              {card.collector_number ? ` · #${card.collector_number}` : ''}
              {card.artist ? ` · Arte por ${card.artist}` : ''}
            </p>
          </div>
        </div>

        <CardSpotlight card={card} eyebrow="Ficha completa" />
      </section>

      <div className={styles.editionSection}>
        <EditionSwitcher
          currentCardId={card.id}
          currentSet={card.set?.toUpperCase()}
          editions={editions}
          setIcons={setIcons}
        />
      </div>

      <section className={styles.infoGrid}>
        <article className={styles.panel}>
          <p className={styles.panelLabel}>Edicao</p>
          <ul className={styles.dataList}>
            <li>
              <strong>Set</strong>
              <span>{card.set_name ?? card.set?.toUpperCase() ?? 'n/a'}</span>
            </li>
            <li>
              <strong>Raridade</strong>
              <span>{card.rarity ?? 'n/a'}</span>
            </li>
            <li>
              <strong>Lancamento</strong>
              <span>{card.released_at ?? 'n/a'}</span>
            </li>
            <li>
              <strong>Numero</strong>
              <span>{card.collector_number ?? 'n/a'}</span>
            </li>
          </ul>
        </article>

        <article className={styles.panel}>
          <p className={styles.panelLabel}>Precos</p>
          <ul className={styles.dataList}>
            <li>
              <strong>USD</strong>
              <span>{card.prices?.usd ?? 'n/a'}</span>
            </li>
            <li>
              <strong>USD Foil</strong>
              <span>{card.prices?.usd_foil ?? 'n/a'}</span>
            </li>
            <li>
              <strong>EUR</strong>
              <span>{card.prices?.eur ?? 'n/a'}</span>
            </li>
          </ul>
        </article>

        <article className={styles.panel}>
          <p className={styles.panelLabel}>Formatos</p>
          {visibleLegalities.length > 0 ? (
            <div className={styles.legalityWrap}>
              {visibleLegalities.map((format) => (
                <span className={styles.legality} key={format}>
                  {format}
                </span>
              ))}
            </div>
          ) : (
            <p className={styles.panelText}>
              Nenhum formato principal disponivel.
            </p>
          )}
        </article>
      </section>
    </main>
  );
}
