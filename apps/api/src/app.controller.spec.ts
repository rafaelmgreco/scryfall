import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should expose starter metadata', () => {
    expect(appController.getAppInfo()).toEqual(
      expect.objectContaining({
        name: 'highmarket-api',
        officialDocs: 'https://scryfall.com/docs/api',
      }),
    );
  });
});
