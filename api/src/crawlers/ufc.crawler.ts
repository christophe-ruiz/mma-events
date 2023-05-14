import axios from 'axios';
import cheerio from 'cheerio';
import { CrawlerInterface } from '../models/crawler.interface';
import { Organization } from '../models/organization';

class UfcCrawler implements CrawlerInterface {
  organization: Organization = new Organization(
    'https://www.ufc.com/',
    'https://www.ufc.com/themes/custom/ufc/images/ufc-logo.svg',
    'Las Vegas, Nevada',
    'The Ultimate Fighting Championship is an American mixed martial arts promotion company based in Las Vegas, Nevada, which is owned and operated by Endeavor Group Holdings along with Silver Lake Partners, Kohlberg Kravis Roberts and MSD Capital via Zuffa, LLC.',
    'https://www.ufc.com/',
    'https://twitter.com/ufc',
    'https://www.facebook.com/UFC/',
    'https://www.instagram.com/ufc/',
    'https://www.youtube.com/user/UFC',
    '2000-11-12T00:00:00.000Z',
    '2021-03-26T19:00:00.000Z',
    '1',
  );

  getAthlete(id: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  getAthletes(category: string): Promise<any> {
    // Uses axios and cheerio to get the athletes from the category page
    return axios
      .get(
        `https://www.ufc.com/athletes/all?filters%5B0%5D=category%3A${category}&page=0`,
      )
      .then((res) => {
        const $ = cheerio.load(res.data);
        const athletes = $(
          '#block-views-athlete-list-block-1 .view-content .views-row',
        )
          .map((i, el) => {
            // Get the data from each athlete
            const name = $(el).find('.views-field-title').text();
            const link = $(el).find('.views-field-title a').attr('href');
            const weight = $(el).find('.views-field-weight').text();
            const height = $(el).find('.views-field-height').text();
            const record = $(el).find('.views-field-w-l-d').text();
            const image = $(el).find('.views-field-picture img').attr('src');

            // Return the athlete object
            return {
              name,
              link,
              weight,
              height,
              record,
              image,
            };
          })
          .get();

        // Return the athletes
        return athletes;
      });
  }

  getEvent(id: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  getEvents(): Promise<any> {
    return Promise.resolve(undefined);
  }

  getRanking(id: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  getRankings(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
