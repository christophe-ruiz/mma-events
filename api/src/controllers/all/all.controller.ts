import { Controller, Get } from '@nestjs/common';
import { BellatorCrawlerService } from '../../services/bellator-crawler/bellator-crawler.service';
import { UfcCrawlerService } from '../../services/ufccrawler/ufc-crawler.service';

@Controller()
export class AllController {
  constructor(
    private bellatorCrawlerService: BellatorCrawlerService,
    private UFCCrawlerService: UfcCrawlerService,
  ) {}

  @Get('/events')
  async getAllEvents(): Promise<string> {
    const events = await Promise.all([
      this.bellatorCrawlerService.getEvents(),
      this.UFCCrawlerService.getEvents(),
    ]);
    return JSON.stringify(
      events
        .flat()
        .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1)),
      null,
      2,
    );
  }
}
