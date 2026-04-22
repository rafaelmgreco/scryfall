import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScryfallApplication } from '../application/scryfall.application';
import { GetNamedCardDto } from '../dto/get-named-card.dto';
import { GetRandomCardDto } from '../dto/get-random-card.dto';
import { SearchCardsDto } from '../dto/search-cards.dto';

@ApiTags('highmarket')
@Controller('highmarket/cards')
export class ScryfallController {
  constructor(private readonly scryfallApplication: ScryfallApplication) {}

  @ApiOperation({ summary: 'Busca uma carta por nome exato ou fuzzy' })
  @ApiOkResponse({ description: 'Carta retornada pela HighMarket.' })
  @Get('named')
  findNamed(@Query() query: GetNamedCardDto) {
    return this.scryfallApplication.findNamedCard(query);
  }

  @ApiOperation({
    summary: 'Busca cartas usando a sintaxe textual suportada pela HighMarket',
  })
  @ApiOkResponse({ description: 'Lista paginada de cartas.' })
  @Get('search')
  search(@Query() query: SearchCardsDto) {
    return this.scryfallApplication.searchCards(query);
  }

  @ApiOperation({ summary: 'Retorna uma carta aleatoria' })
  @ApiOkResponse({ description: 'Carta aleatoria retornada pela HighMarket.' })
  @Get('random')
  random(@Query() query: GetRandomCardDto) {
    return this.scryfallApplication.getRandomCard(query);
  }

  @ApiOperation({ summary: 'Busca uma carta por id na HighMarket' })
  @ApiOkResponse({ description: 'Carta retornada pela HighMarket.' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.scryfallApplication.findCardById(id);
  }
}
