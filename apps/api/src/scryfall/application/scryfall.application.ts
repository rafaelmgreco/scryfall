import { BadRequestException, Injectable } from '@nestjs/common';
import { GetNamedCardDto } from '../dto/get-named-card.dto';
import { GetRandomCardDto } from '../dto/get-random-card.dto';
import { SearchCardsDto } from '../dto/search-cards.dto';
import { ScryfallApiService } from '../services/scryfall-api.service';

@Injectable()
export class ScryfallApplication {
  constructor(private readonly scryfallApiService: ScryfallApiService) {}

  findNamedCard(query: GetNamedCardDto) {
    if (!query.exact && !query.fuzzy) {
      throw new BadRequestException(
        'Informe "exact" ou "fuzzy" para consultar /cards/named.',
      );
    }

    if (query.exact && query.fuzzy) {
      throw new BadRequestException(
        'Use apenas um dos parâmetros: "exact" ou "fuzzy".',
      );
    }

    return this.scryfallApiService.findNamed(query);
  }

  searchCards(query: SearchCardsDto) {
    return this.scryfallApiService.search(query);
  }

  getRandomCard(query: GetRandomCardDto) {
    return this.scryfallApiService.random(query);
  }

  findCardById(id: string) {
    return this.scryfallApiService.findById(id);
  }

  findSetByCode(code: string) {
    return this.scryfallApiService.findSetByCode(code);
  }
}
