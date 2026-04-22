import { ScryfallCard, ScryfallList, ScryfallSet } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

interface ApiErrorBody {
  details?: string;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchFromApi<T>(path: string) {
  const response = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
  });

  const payload = (await response.json().catch(() => undefined)) as
    | T
    | ApiErrorBody
    | undefined;

  if (!response.ok) {
    const message =
      (payload as ApiErrorBody | undefined)?.details ??
      `Request failed with status ${response.status}`;

    throw new ApiError(message, response.status);
  }

  return payload as T;
}

export async function searchCards(query: string) {
  return searchCardsWithOptions(query);
}

interface SearchCardsOptions {
  unique?: string;
  order?: string;
  dir?: string;
  page?: number;
}

export async function searchCardsWithOptions(
  query: string,
  options: SearchCardsOptions = {},
) {
  const params = new URLSearchParams();
  params.set('q', query);
  if (options.unique) {
    params.set('unique', options.unique);
  }
  if (options.order) {
    params.set('order', options.order);
  }
  if (options.dir) {
    params.set('dir', options.dir);
  }
  if (typeof options.page === 'number') {
    params.set('page', String(options.page));
  }

  return fetchFromApi<ScryfallList<ScryfallCard>>(
    `/highmarket/cards/search?${params.toString()}`,
  );
}

export async function randomCard(query?: string) {
  const params = new URLSearchParams();

  if (query && query.trim().length > 0) {
    params.set('q', query);
  }

  const suffix = params.toString();

  return fetchFromApi<ScryfallCard>(
    suffix.length > 0
      ? `/highmarket/cards/random?${suffix}`
      : '/highmarket/cards/random',
  );
}

export async function getCardById(id: string) {
  return fetchFromApi<ScryfallCard>(`/highmarket/cards/${id}`);
}

export async function getSetByCode(code: string) {
  return fetchFromApi<ScryfallSet>(`/highmarket/sets/${code}`);
}

export async function findNamedCard(name: string) {
  const params = new URLSearchParams();
  params.set('fuzzy', name);

  return fetchFromApi<ScryfallCard>(
    `/highmarket/cards/named?${params.toString()}`,
  );
}

export async function getCardPrints(oracleId: string) {
  return searchCardsWithOptions(`oracleid:${oracleId}`, {
    unique: 'prints',
    order: 'released',
    dir: 'desc',
  });
}

export function getCardImage(card: ScryfallCard) {
  return card.image_uris?.normal ?? card.card_faces?.[0]?.image_uris?.normal;
}

export function getCardOracleText(card: ScryfallCard) {
  if (card.oracle_text) {
    return card.oracle_text;
  }

  return card.card_faces
    ?.map((face) => face.oracle_text)
    .filter(Boolean)
    .join('\n\n');
}
