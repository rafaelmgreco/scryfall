export interface ScryfallList<T> {
  object: 'list';
  total_cards?: number;
  has_more: boolean;
  next_page?: string;
  warnings?: string[];
  data: T[];
}
