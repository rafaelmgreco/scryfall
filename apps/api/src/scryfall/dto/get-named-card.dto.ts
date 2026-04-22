import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetNamedCardDto {
  @ApiPropertyOptional({
    example: 'Black Lotus',
    description: 'Nome exato da carta.',
  })
  @IsOptional()
  @IsString()
  exact?: string;

  @ApiPropertyOptional({
    example: 'jac bele',
    description: 'Busca fuzzy para nomes com erro ou parcial.',
  })
  @IsOptional()
  @IsString()
  fuzzy?: string;

  @ApiPropertyOptional({
    example: 'vma',
    description: 'Codigo da colecao para limitar o resultado.',
  })
  @IsOptional()
  @IsString()
  set?: string;
}
