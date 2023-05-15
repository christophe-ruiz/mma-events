import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UfcController } from './ufc/ufc.controller';
import { UfcCrawlerService } from './ufccrawler/ufc-crawler.service';

@Module({
  imports: [],
  controllers: [AppController, UfcController],
  providers: [AppService, UfcCrawlerService],
})
export class AppModule {}

