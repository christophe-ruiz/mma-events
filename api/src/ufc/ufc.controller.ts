import { Controller, Get } from '@nestjs/common';
import { UfcCrawlerService } from '../ufccrawler/ufc-crawler.service';

@Controller('ufc')
export class UfcController {
  constructor(private UFCCrawlerService: UfcCrawlerService) {}
  @Get('/events')
  async getUFCEvents(): Promise<string> {
    return JSON.stringify(await this.UFCCrawlerService.getEvents(), null, 2);
  }
}
