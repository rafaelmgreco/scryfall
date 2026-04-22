import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetRandomCardDto {
  @ApiPropertyOptional({
    example: 't:angel',
    description: 'Filtro opcional usando a sintaxe de busca da Scryfall.',
  })
  @IsOptional()
  @IsString()
  q?: string;
}
