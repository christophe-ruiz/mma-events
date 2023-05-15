import { OrganizationInterface } from './organization.interface';

export interface CrawlerInterface {
  organization: OrganizationInterface;
  getAthletes(category: string): Promise<any>;
  getEvents(): Promise<any>;
  getRankings(): Promise<any>;
  getAthlete(id: string): Promise<any>;
  getEvent(id: string): Promise<any>;
  getRanking(id: string): Promise<any>;
}
