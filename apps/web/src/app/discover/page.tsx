import Link from 'next/link';
import { CardGrid } from '@/components/card-grid';
import { CardSpotlight } from '@/components/card-spotlight';
import { randomCard, searchCards } from '@/lib/scryfall';
import { SearchPreset } from '@/lib/types';
import styles from './discover.module.css';

const PRESETS: SearchPreset[] = [
  {
    label: 'Anjos',
    query: 't:angel game:paper',
    description: 'Criaturas celestiais com presença forte na mesa.',
  },
  {
    label: 'Dragoes',
    query: 't:dragon game:paper',
    description: 'Coleção de asas, fogo e ameaças grandiosas.',
  },
  {
    label: 'Artefatos',
    query: 't:artifact game:paper',
    description: 'Peças clássicas, relíquias e engenhocas.',
  },
  {
    label: 'Terrenos',
    query: 't:land game:paper',
    description: 'Paisagens, utilidade e base de mana.',
  },
];

export default async function DiscoverPage() {
  const [featured, collection] = await Promise.all([
    randomCard('t:dragon game:paper'),
    searchCards('t:legendary game:paper'),
  ]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Descobrir</p>
          <h1>Explore coleções prontas sem precisar montar a busca do zero.</h1>
          <p className={styles.lead}>
            Entre por um tema, veja uma carta em destaque e continue navegando
            para aprofundar a descoberta.
          </p>
        </div>
      </section>

      <section className={styles.presetSection}>
        {PRESETS.map((preset) => (
          <Link
            className={styles.presetCard}
            href={`/search?q=${encodeURIComponent(preset.query)}`}
            key={preset.label}
          >
            <strong>{preset.label}</strong>
            <span>{preset.description}</span>
          </Link>
        ))}
      </section>

      <section className={styles.spotlightSection}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Carta surpresa</p>
            <h2>Uma descoberta para inspirar a próxima busca</h2>
          </div>
        </div>
        <CardSpotlight card={featured} eyebrow="Selecao aleatoria" />
      </section>

      <section className={styles.gridSection}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Colecao base</p>
            <h2>Lendárias para continuar explorando</h2>
          </div>
        </div>
        <CardGrid cards={collection.data.slice(0, 12)} />
      </section>
    </main>
  );
}
