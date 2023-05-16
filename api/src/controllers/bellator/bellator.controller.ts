import { Controller, Get } from '@nestjs/common';
import { BellatorCrawlerService } from '../../services/bellator-crawler/bellator-crawler.service';

@Controller('bellator')
export class BellatorController {
  constructor(private bellatorCrawlerService: BellatorCrawlerService) {}

  @Get('/events')
  async getBellatorEvents(): Promise<string> {
    return JSON.stringify(
      await this.bellatorCrawlerService.getEvents(),
      null,
      2,
    );
  }
}
