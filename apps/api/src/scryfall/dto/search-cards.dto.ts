import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

function toBoolean(value: unknown) {
  return value === true || value === 'true' || value === 1 || value === '1';
}

export class SearchCardsDto {
  @ApiProperty({
    example: 'type:dragon',
    description: 'Query textual no formato suportado pela busca da Scryfall.',
  })
  @IsString()
  @MaxLength(1000)
  q!: string;

  @ApiPropertyOptional({
    example: 'cards',
    description: 'Estrategia para omitir cartas similares.',
  })
  @IsOptional()
  @IsString()
  unique?: string;

  @ApiPropertyOptional({
    example: 'cmc',
    description: 'Campo de ordenacao dos resultados.',
  })
  @IsOptional()
  @IsString()
  order?: string;

  @ApiPropertyOptional({
    example: 'asc',
    description: 'Direcao da ordenacao.',
  })
  @IsOptional()
  @IsString()
  dir?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Inclui extras, como tokens e cards especiais.',
  })
  @IsOptional()
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  include_extras?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Inclui cartas em outros idiomas.',
  })
  @IsOptional()
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  include_multilingual?: boolean;

  @ApiPropertyOptional({
    example: false,
    description: 'Inclui variacoes de cartas.',
  })
  @IsOptional()
  @Transform(({ value }) => toBoolean(value))
  @IsBoolean()
  include_variations?: boolean;

  @ApiPropertyOptional({
    example: 2,
    description: 'Numero da pagina.',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  page?: number;
}
