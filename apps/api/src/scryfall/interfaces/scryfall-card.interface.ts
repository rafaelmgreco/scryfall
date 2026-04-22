export interface ScryfallCard {
  object: 'card';
  id: string;
  oracle_id?: string;
  name: string;
  lang: string;
  released_at?: string;
  uri: string;
  scryfall_uri: string;
  layout: string;
  image_uris?: Record<string, string>;
  mana_cost?: string;
  cmc?: number;
  type_line?: string;
  oracle_text?: string;
  colors?: string[];
  color_identity?: string[];
  legalities?: Record<string, string>;
  prices?: Record<string, string | null>;
  set?: string;
  set_name?: string;
  rarity?: string;
  collector_number?: string;
  digital?: boolean;
  foil?: boolean;
  nonfoil?: boolean;
  [key: string]: unknown;
}
