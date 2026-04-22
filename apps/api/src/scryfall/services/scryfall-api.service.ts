import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AxiosError, isAxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { GetNamedCardDto } from '../dto/get-named-card.dto';
import { GetRandomCardDto } from '../dto/get-random-card.dto';
import { SearchCardsDto } from '../dto/search-cards.dto';
import { ScryfallCard } from '../interfaces/scryfall-card.interface';
import { ScryfallError } from '../interfaces/scryfall-error.interface';
import { ScryfallList } from '../interfaces/scryfall-list.interface';
import { ScryfallSet } from '../interfaces/scryfall-set.interface';

@Injectable()
export class ScryfallApiService {
  constructor(private readonly httpService: HttpService) {}

  findNamed(query: GetNamedCardDto) {
    return this.get<ScryfallCard>('/cards/named', query);
  }

  search(query: SearchCardsDto) {
    return this.get<ScryfallList<ScryfallCard>>('/cards/search', query);
  }

  random(query: GetRandomCardDto) {
    return this.get<ScryfallCard>('/cards/random', query);
  }

  findById(id: string) {
    return this.get<ScryfallCard>(`/cards/${id}`);
  }

  findSetByCode(code: string) {
    return this.get<ScryfallSet>(`/sets/${code}`);
  }

  private async get<T>(path: string, params?: object): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<T>(path, { params }),
      );

      return response.data;
    } catch (error) {
      throw this.mapScryfallError(error);
    }
  }

  private mapScryfallError(error: unknown): HttpException {
    if (isAxiosError(error) && error.response) {
      const status = error.response.status;
      const data = error.response.data as Partial<ScryfallError> | undefined;

      return new HttpException(
        {
          status,
          code: data?.code ?? 'scryfall_error',
          details: data?.details ?? error.message,
          type: data?.type ?? 'error',
          source: 'scryfall',
        },
        status,
      );
    }

    if (this.isAxiosRequestError(error)) {
      return new ServiceUnavailableException({
        status: 503,
        code: 'scryfall_unavailable',
        details: 'Nao foi possivel conectar a API da Scryfall.',
        type: 'service_error',
        source: 'scryfall',
      });
    }

    return new InternalServerErrorException({
      status: 500,
      code: 'unexpected_error',
      details: 'Ocorreu um erro inesperado ao consultar a Scryfall.',
      type: 'internal_error',
      source: 'scryfall',
    });
  }

  private isAxiosRequestError(error: unknown): error is AxiosError {
    return isAxiosError(error) && Boolean(error.request);
  }
}
