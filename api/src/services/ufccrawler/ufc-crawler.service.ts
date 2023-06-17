import { Injectable } from '@nestjs/common';
import { CrawlerInterface } from '../../models/crawler.interface';
import { OrganizationInterface } from '../../models/organization.interface';
import axios from 'axios';
import cheerio from 'cheerio';
import { EventInterface } from '../../models/event.interface';

@Injectable()
export class UfcCrawlerService implements CrawlerInterface {
  organization: OrganizationInterface = {
    url: 'https://www.ufc.com',
    logo: 'https://www.ufc.com/themes/custom/ufc/images/ufc-logo.svg',
    location: 'Las Vegas, Nevada',
    description:
      'The Ultimate Fighting Championship is an American mixed martial arts promotion company based in Las Vegas, Nevada, which is owned and operated by Endeavor Group Holdings along with Silver Lake Partners, Kohlberg Kravis Roberts and MSD Capital via Zuffa, LLC.',
    website: 'https://www.ufc.com',
    twitter: 'https://twitter.com/ufc',
    facebook: 'https://www.facebook.com/UFC',
    instagram: 'https://www.instagram.com/ufc',
    youtube: 'https://www.youtube.com/user/UFC',
    created_at: '2000-11-12T00:00:00.000Z',
    updated_at: '2021-03-26T19:00:00.000Z',
    id: '1',
  };

  private getTitleFromURL(url: string): string {
    const title = url.split('/').pop();
    const rawParts = title.split('-');
    const titleParts = [];
    const wc = Math.min(3, rawParts.length);

    for (let i = 0; i < wc; i++) {
      const part = rawParts[i];
      if (part === 'ufc') {
        titleParts.push('UFC');
      } else if (!isNaN(Number(part))) {
        titleParts.push(part);
      } else {
        titleParts.push(part.charAt(0).toUpperCase() + part.slice(1));
      }
    }

    return titleParts.join(' ');
  }

  getAthlete(id: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  getAthletes(category: string): Promise<any> {
    // Uses axios and cheerio to get the athletes from the category page
    return axios
      .get(
        `${this.organization.url}/athletes/all?filters%5B0%5D=category%3A${category}&page=0`,
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

  async getEvents(): Promise<EventInterface[]> {
    return await Promise.all([
      this.getUpcomingEvents(),
      this.getPastEvents(),
    ]).then((res) => {
      return res[0]
        .concat(res[1])
        .sort((a, b) => Number(b.date) - Number(a.date));
    });
  }

  async getUpcomingEvents(): Promise<EventInterface[]> {
    // Uses axios and cheerio to get the events on ufc site
    const res = await axios.get('https://www.ufc.com/events');
    const $ = cheerio.load(res.data);
    return $('#events-list-upcoming .c-card-event--result ')
      .map((i, el) => {
        // Get the data from each event
        const titleTag = $(el).find('.c-card-event--result__headline > a');
        const name =
          this.getTitleFromURL(titleTag.attr('href')) +
          ' (' +
          titleTag.text() +
          ')';
        const date = $(el)
          .find('.c-card-event--result__date')
          .attr('data-main-card-timestamp');
        // accumulates all span in the selector
        const city = $(el)
          .find('.c-card-event--result__location span')
          .map((index, element) => $(element).text())
          .get()
          .join(', ');
        const location =
          $(el).find('.c-card-event--result__location h5').text().trim() +
          ' (' +
          city +
          ')';
        return {
          name: name,
          date: Number(date) * 1000,
          location: location,
        };
      })
      .get();
  }

  async getPastEvents(): Promise<EventInterface[]> {
    // Uses axios and cheerio to get the events on ufc site
    const res = await axios.get('https://www.ufc.com/events');
    const $ = cheerio.load(res.data);
    const events = $('#events-list-past .c-card-event--result ')
      .map((i, el) => {
        // Get the data from each event
        const titleTag = $(el).find('.c-card-event--result__headline > a');
        const name =
          this.getTitleFromURL(titleTag.attr('href')) +
          ' (' +
          titleTag.text() +
          ')';
        const date = $(el)
          .find('.c-card-event--result__date')
          .attr('data-main-card-timestamp');
        // accumulates all span in the selector
        const city = $(el)
          .find('.c-card-event--result__location span')
          .map((index, element) => $(element).text())
          .get()
          .join(', ');
        const location =
          $(el).find('.c-card-event--result__location h5').text().trim() +
          ' (' +
          city +
          ')';
        return {
          name: name,
          date: Number(date) * 1000,
          location: location,
        };
      })
      .get();

    return events;
  }

  getRanking(id: string): Promise<any> {
    return Promise.resolve(undefined);
  }

  getRankings(): Promise<any> {
    return Promise.resolve(undefined);
  }
}
