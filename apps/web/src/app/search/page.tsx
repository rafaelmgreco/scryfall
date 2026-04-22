import { CardGrid } from '@/components/card-grid';
import { CTA } from '@/components/cta';
import { ApiError, findNamedCard, searchCards } from '@/lib/scryfall';
import styles from './search.module.css';

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

type SearchState =
  | {
      type: 'results';
      cards: Awaited<ReturnType<typeof findNamedCard>>[];
      total: number;
      hasMore: boolean;
      helperText?: string;
    }
  | {
      type: 'empty';
      title: string;
      description: string;
    }
  | {
      type: 'error';
      title: string;
      description: string;
    };

function isAdvancedQuery(query: string) {
  return /[:()=!<>]/.test(query);
}

function quoteTerm(query: string) {
  return query.replaceAll('"', '').trim();
}

async function resolveSearch(query: string): Promise<SearchState> {
  const normalized = query.trim();

  if (normalized.length === 0) {
    return {
      type: 'empty',
      title: 'Comece digitando uma busca',
      description: 'Procure por nome, tipo, cor ou por um trecho do texto da carta.',
    };
  }

  try {
    if (isAdvancedQuery(normalized)) {
      const results = await searchCards(normalized);

      return {
        type: 'results',
        cards: results.data,
        total: results.total_cards ?? results.data.length,
        hasMore: results.has_more,
      };
    }

    const directResults = await searchCards(normalized);

    return {
      type: 'results',
      cards: directResults.data,
      total: directResults.total_cards ?? directResults.data.length,
      hasMore: directResults.has_more,
      helperText: 'Mostrando os resultados mais relevantes para a sua busca.',
    };
  } catch (error) {
    if (!(error instanceof ApiError)) {
      return {
        type: 'error',
        title: 'Nao foi possivel concluir a busca',
        description: 'Tente novamente em instantes.',
      };
    }

    if (error.status !== 404) {
      return {
        type: 'error',
        title: 'Nao foi possivel concluir a busca',
        description: error.message,
      };
    }

    if (isAdvancedQuery(normalized)) {
      return {
        type: 'empty',
        title: 'Nenhuma carta encontrada',
        description: 'Tente simplificar os filtros ou usar menos operadores na consulta.',
      };
    }

    if (normalized.includes(' ')) {
      try {
        const oracleResults = await searchCards(
          `oracle:"${quoteTerm(normalized)}"`,
        );

        return {
          type: 'results',
          cards: oracleResults.data,
          total: oracleResults.total_cards ?? oracleResults.data.length,
          hasMore: oracleResults.has_more,
          helperText: 'Encontramos cartas pelo texto de regras informado.',
        };
      } catch (oracleError) {
        if (!(oracleError instanceof ApiError) || oracleError.status !== 404) {
          return {
            type: 'error',
            title: 'Nao foi possivel concluir a busca',
            description:
              oracleError instanceof ApiError
                ? oracleError.message
                : 'Tente novamente em instantes.',
          };
        }
      }
    }

    try {
      const card = await findNamedCard(normalized);

      return {
        type: 'results',
        cards: [card],
        total: 1,
        hasMore: false,
        helperText: 'Nao encontramos uma lista ampla, mas achamos a carta mais proxima pelo nome.',
      };
    } catch (namedError) {
      if (namedError instanceof ApiError && namedError.status === 404) {
        return {
          type: 'empty',
          title: 'Nenhuma carta encontrada',
          description:
            'Experimente outro nome, use um trecho menor do texto da carta ou tente uma busca como t:dragon.',
        };
      }

      return {
        type: 'error',
        title: 'Nao foi possivel concluir a busca',
        description: 'Tente novamente em instantes.',
      };
    }
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const rawQuery = params.q;
  const query = Array.isArray(rawQuery) ? rawQuery[0] : rawQuery;
  const state = query ? await resolveSearch(query) : null;

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <p className={styles.kicker}>Busca</p>
        <h1>
          {query ? `Resultados para "${query}"` : 'Comece digitando uma busca'}
        </h1>
        <p className={styles.lead}>
          Use a barra no topo para procurar nomes, tipos, cores, custos ou texto
          de regras.
        </p>
      </section>

      {!query && (
        <section className={styles.emptyState}>
          <h2>Digite algo para começar</h2>
          <p>Use a barra do topo para procurar nome, tipo, cor ou texto de regra.</p>
        </section>
      )}

      {query && state?.type === 'empty' && (
        <section className={styles.emptyState}>
          <h2>{state.title}</h2>
          <p>{state.description}</p>
          <div className={styles.actions}>
            <CTA href="/discover">Explorar temas</CTA>
            <CTA href="/" variant="secondary">
              Voltar para a home
            </CTA>
          </div>
        </section>
      )}

      {query && state?.type === 'error' && (
        <section className={styles.emptyState}>
          <h2>{state.title}</h2>
          <p>{state.description}</p>
        </section>
      )}

      {query && state?.type === 'results' && (
        <section className={styles.results}>
          <div className={styles.meta}>
            <span>{state.total} cartas encontradas</span>
            <span>
              {state.hasMore ? 'Ha mais resultados disponiveis' : 'Resultado completo'}
            </span>
            {state.helperText && <span>{state.helperText}</span>}
          </div>
          <CardGrid cards={state.cards.slice(0, 12)} />
        </section>
      )}
    </main>
  );
}
