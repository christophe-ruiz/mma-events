/**
 * Interface for MMA Organization Crawlers (e.g. UFC, Bellator, etc.)
 * @interface
 * @param {string} url - The url of the organization's website
 * @param {string} name - The name of the organization
 * @param {string} description - The description of the organization
 * @param {string} location - The location of the organization
 * @param {string} website - The website of the organization
 * @param {string} facebook - The facebook of the organization
 * @param {string} twitter - The twitter of the organization
 * @param {string} instagram - The instagram of the organization
 * @param {string} youtube - The youtube of the organization
 * @function events - Returns the events of the organization
 * @function fighters - Returns the fighters of the organization
 * @function athlete - Returns an athlete of the organization
 */
class OrganizationCrawler {
    constructor(url, name, description, location, website, facebook, twitter, instagram, youtube) {
        this.url = url;
        this.name = name;
        this.description = description;
        this.location = location;
        this.website = website;
        this.facebook = facebook;
        this.twitter = twitter;
        this.instagram = instagram;
        this.youtube = youtube;
    }
    events = () => {};
    fighters = () => {};
    athlete = (name) => {};
}
