import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScryfallApplication } from '../application/scryfall.application';

@ApiTags('highmarket')
@Controller('highmarket/sets')
export class ScryfallSetsController {
  constructor(private readonly scryfallApplication: ScryfallApplication) {}

  @ApiOperation({ summary: 'Busca um set por codigo na HighMarket' })
  @ApiOkResponse({ description: 'Set retornado pela HighMarket.' })
  @Get(':code')
  findByCode(@Param('code') code: string) {
    return this.scryfallApplication.findSetByCode(code);
  }
}
