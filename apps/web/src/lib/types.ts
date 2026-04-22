export interface CardFace {
  name?: string;
  type_line?: string;
  oracle_text?: string;
  image_uris?: {
    normal?: string;
  };
}

export interface ScryfallCard {
  id: string;
  oracle_id?: string;
  name: string;
  lang?: string;
  digital?: boolean;
  released_at?: string;
  type_line?: string;
  oracle_text?: string;
  mana_cost?: string;
  set?: string;
  set_name?: string;
  rarity?: string;
  artist?: string;
  collector_number?: string;
  prices?: {
    usd?: string | null;
    usd_foil?: string | null;
    eur?: string | null;
  };
  legalities?: Record<string, string>;
  image_uris?: {
    normal?: string;
  };
  card_faces?: CardFace[];
  scryfall_uri?: string;
}

export interface ScryfallList<T> {
  total_cards?: number;
  has_more: boolean;
  next_page?: string;
  data: T[];
}

export interface ScryfallSet {
  id: string;
  code: string;
  name: string;
  icon_svg_uri?: string;
}

export interface SearchPreset {
  label: string;
  query: string;
  description: string;
}
