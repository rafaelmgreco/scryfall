import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ScryfallApplication } from './application/scryfall.application';
import { ScryfallController } from './controllers/scryfall.controller';
import { ScryfallSetsController } from './controllers/scryfall-sets.controller';
import { ScryfallApiService } from './services/scryfall-api.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        baseURL: configService.getOrThrow<string>('SCRYFALL_API_BASE_URL'),
        timeout: 5000,
        headers: {
          'User-Agent': configService.getOrThrow<string>('SCRYFALL_USER_AGENT'),
          Accept: 'application/json;q=0.9,*/*;q=0.8',
        },
      }),
    }),
  ],
  controllers: [ScryfallController, ScryfallSetsController],
  providers: [ScryfallApplication, ScryfallApiService],
})
export class ScryfallModule {}
