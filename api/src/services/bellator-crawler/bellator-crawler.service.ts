import { Injectable } from '@nestjs/common';
import { CrawlerInterface } from '../../models/crawler.interface';
import { OrganizationInterface } from '../../models/organization.interface';
import axios from 'axios';
import cheerio from 'cheerio';
import { EventInterface } from '../../models/event.interface';
import { parse } from 'date-fns';

@Injectable()
export class BellatorCrawlerService implements CrawlerInterface {
  organization: OrganizationInterface = {
    url: 'https://www.bellator.com',
    logo: 'https://www.bellator.com/themes/custom/bellator/images/bellator-logo.svg',
    location: 'Santa Monica, California',
    description:
      'Bellator MMA is an American mixed martial arts promotion company based in Santa Monica, California that is owned and operated as a subsidiary of ViacomCBS.',
    website: 'https://www.bellator.com',
    twitter: 'https://twitter.com/BellatorMMA',
    facebook: 'https://www.facebook.com/BellatorMMA',
    instagram: 'https://www.instagram.com/bellatormma',
    youtube: 'https://www.youtube.com/user/BellatorMMA',
    created_at: '2008-10-18T00:00:00.000Z',
    updated_at: '2021-03-26T19:00:00.000Z',
    id: '2',
  };

  getAthlete(id: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  getAthletes(category: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  getEvent(id: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  async getEvents(): Promise<any> {
    return this.getUpcomingEvents();
  }

  async getUpcomingEvents(): Promise<EventInterface[]> {
    const res = await axios.get(`${this.organization.url}/event`);
    const $ = cheerio.load(res.data);
    return $('.bIlsce .dnctcc')
      .map((i, el) => {
        // Retrieves name and location from bellator website. The two first p elements are the name once concatenated and the location is the third and last p element.
        const nameAndLocation = $(el).find('.kRNiwu p');
        const name = nameAndLocation
          .slice(0, 2)
          .map((i, el) => $(el).text())
          .get()
          .join(' ');
        const dateString = $(el).find('.hXJIly').text().trim();
        const date = parse(dateString, 'EEEE, MMMM d', new Date()).getTime();

        const location = nameAndLocation
          .slice(2)
          .map((i, el) => $(el).text())
          .get()
          .join(' ');
        return {
          name: name,
          date: date,
          location: location,
        };
      })
      .get();
  }

  getRanking(id: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  getRankings(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
