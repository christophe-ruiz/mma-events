import { Organization } from './organization';

export interface CrawlerInterface {
  organization: Organization;
  getAthletes(category: string): Promise<any>;
  getEvents(): Promise<any>;
  getRankings(): Promise<any>;
  getAthlete(id: string): Promise<any>;
  getEvent(id: string): Promise<any>;
  getRanking(id: string): Promise<any>;
}
