import Link from 'next/link';
import { CardGrid } from '@/components/card-grid';
import { CardSpotlight } from '@/components/card-spotlight';
import { CTA } from '@/components/cta';
import { randomCard, searchCards } from '@/lib/scryfall';
import { SearchPreset } from '@/lib/types';
import styles from './page.module.css';

const PRESETS: SearchPreset[] = [
  {
    label: 'Anjos',
    query: 't:angel game:paper',
    description: 'Criaturas celestiais com artes icônicas.',
  },
  {
    label: 'Dragoes',
    query: 't:dragon game:paper',
    description: 'Ameacas enormes, fogo e impacto visual.',
  },
  {
    label: 'Encantamentos',
    query: 't:enchantment game:paper',
    description: 'Magia, atmosfera e cartas de mesa marcantes.',
  },
  {
    label: 'Lendarias',
    query: 't:legendary game:paper',
    description: 'Personagens e criaturas inesqueciveis.',
  },
];

export default async function HomePage() {
  const [featuredCard, dreamyCards] = await Promise.all([
    randomCard('t:legendary game:paper'),
    searchCards('t:enchantment game:paper'),
  ]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Magic: The Gathering</p>
          <h1>Sua proxima carta favorita pode estar aqui.</h1>
          <p className={styles.lead}>
            Busque por nome, por trecho do texto da carta ou siga temas prontos
            para descobrir novas artes, criaturas e colecoes marcantes.
          </p>

          <div className={styles.heroActions}>
            <CTA href="/discover">Explorar colecoes</CTA>
            <CTA href="/search?q=legendary%20creature" variant="secondary">
              Ver cartas em destaque
            </CTA>
          </div>
        </div>

        <div className={styles.heroThemes}>
          <p className={styles.blockLabel}>Comece por um tema</p>
          <div className={styles.themeGrid}>
            {PRESETS.map((preset) => (
              <Link
                className={styles.themeCard}
                href={`/search?q=${encodeURIComponent(preset.query)}`}
                key={preset.label}
              >
                <strong>{preset.label}</strong>
                <span>{preset.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.blockLabel}>Carta em destaque</p>
            <h2>Uma escolha especial para começar a explorar</h2>
          </div>
          <CTA className={styles.inlineLink} href="/discover" variant="secondary">
            Abrir descoberta guiada
          </CTA>
        </div>

        <CardSpotlight card={featuredCard} eyebrow="Destaque do dia" />
      </section>

      <section className={styles.gallerySection}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.blockLabel}>Galeria suave</p>
            <h2>Encantamentos e cartas com mais atmosfera</h2>
          </div>
          <CTA
            className={styles.inlineLink}
            href="/search?q=t%3Aenchantment%20game%3Apaper"
            variant="secondary"
          >
            Ver mais resultados
          </CTA>
        </div>

        <CardGrid cards={dreamyCards.data.slice(0, 8)} />
      </section>
    </main>
  );
}
