export interface ScryfallSet {
  object: 'set';
  id: string;
  code: string;
  name: string;
  released_at?: string;
  set_type?: string;
  icon_svg_uri?: string;
  [key: string]: unknown;
}
