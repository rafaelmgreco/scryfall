import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Exibe informacoes basicas da aplicacao' })
  @ApiOkResponse({
    description: 'Metadados e rotas principais da API.',
  })
  @Get()
  getAppInfo() {
    return {
      name: 'highmarket-api',
      description:
        'API em NestJS para consultar cartas e dados vindos da Scryfall.',
      officialDocs: 'https://scryfall.com/docs/api',
      swagger: '/docs',
      endpoints: [
        'GET /highmarket/cards/named?exact=Black Lotus',
        'GET /highmarket/cards/search?q=type:dragon',
        'GET /highmarket/cards/random?q=t%3Aangel',
      ],
    };
  }
}
