import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UfcController } from './controllers/ufc/ufc.controller';
import { UfcCrawlerService } from './services/ufccrawler/ufc-crawler.service';
import { BellatorCrawlerService } from './services/bellator-crawler/bellator-crawler.service';
import { BellatorController } from './controllers/bellator/bellator.controller';
import { AllController } from './controllers/all/all.controller';

@Module({
  imports: [],
  controllers: [AppController, UfcController, BellatorController, AllController],
  providers: [AppService, UfcCrawlerService, BellatorCrawlerService],
})
export class AppModule {}

