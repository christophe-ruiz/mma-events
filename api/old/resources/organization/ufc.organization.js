/**
 * Exposes 3 functions:
 * 1. events: connects to the url and return the url/events html content
 * 2. fighters: connects to the url and return the url/fighters html content
 * 3. athletes(name): connects to the url and return the url/athletes/name html content
 */
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.ufc.com';

class UFC extends OrganizationCrawler {
    constructor() {
        super(
            'https://www.ufc.com',
            'Ultimate Fighting Championship (UFC)',
            'The Ultimate Fighting Championship (UFC) is an American mixed martial arts promotion company based in Las Vegas, Nevada, which is owned and operated by parent company William Morris Endeavor. It is the largest MMA promotion company in the world and features the highest-level fighters on the roster.',
            'Las Vegas, Nevada',
            'https://www.ufc.com',
            'https://www.facebook.com/ufc',
            'https://twitter.com/ufc',
            'https://www.instagram.com/ufc/',
            'https://www.youtube.com/channel/UCvgfXK4nTYKudb0rFR6noLA'
        );
    }
    events = async () => {
        const response = await axios.get(`${url}/organizations/Ultimate-Fighting-Championship-UFC-2`);
        const html = response.data;
        const $ = cheerio.load(html);

        const events = [];
        $('.event tr').each((i, elem) => {
            const event = {};
            const eventDate = $(elem).find('.date').text().trim();
            const eventLocation = $(elem).find('.location').text().trim();
            const eventTitle = $(elem).find('.event-title').text().trim();
            const eventSubtitle = $(elem).find('.subtitle').text().trim();
            const eventResult = $(elem).find('.final_result').text().trim();
            const eventLink = $(elem).find('.event-title a').attr('href');

            event.eventDate = eventDate;
            event.eventLocation = eventLocation;
            event.eventTitle = eventTitle;
            event.eventSubtitle = eventSubtitle;
            event.eventResult = eventResult;
            event.eventLink = eventLink;

            events.push(event);
        });

        return events;
    };

    fighters = async () => {
        const response = await axios.get(`${url}/organizations/Ultimate-Fighting-Championship-UFC-2/fighters`);
        const html = response.data;
        const $ = cheerio.load(html);

        const fighters = [];
        $('.fightfinder_result tr').each((i, elem) => {
            const fighter = {};
            const fighterName = $(elem).find('.name').text().trim();
            const fighterNickname = $(elem).find('.nickname').text().trim();
            const fighterLink = $(elem).find('.name a').attr('href');

            fighter.fighterName = fighterName;
            fighter.fighterNickname = fighterNickname;
            fighter.fighterLink = fighterLink;

            fighters.push(fighter);
        });

        return fighters;
    }

    athlete = async (name) => {
        const response = await axios.get(`${url}/fighter/${name}`);
        const html = response.data;
        const $ = cheerio.load(html);

        const athlete = {};
        const athleteName = $('.fn').text().trim();
        const athleteNickname = $('.nickname').text().trim();
        const athleteBirthDate = $('.birthday').text().trim();
        const athleteHeight = $('.height').text().trim();
        const athleteWeight = $('.weight').text().trim();
        const athleteAssociation = $('.association').text().trim();
        const athleteClass = $('.class').text().trim();
        const athleteWins = $('.record .left_side .bio_graph').first().text().trim();
        const athleteLosses = $('.record .left_side .bio_graph').last().text().trim();
        const athleteDraws = $('.record .right_side .bio_graph').first().text().trim();
        const athleteNoContests = $('.record .right_side .bio_graph').last().text().trim();
        const athleteLink = $('.bio_graph a').attr('href');
        const athleteImage = $('.profile_image img').attr('src');

        athlete.athleteName = athleteName;
        athlete.athleteNickname = athleteNickname;
        athlete.athleteBirthDate = athleteBirthDate;
        athlete.athleteHeight = athleteHeight;
        athlete.athleteWeight = athleteWeight;
        athlete.athleteAssociation = athleteAssociation;
        athlete.athleteClass = athleteClass;
        athlete.athleteWins = athleteWins;
        athlete.athleteLosses = athleteLosses;
        athlete.athleteDraws = athleteDraws;
        athlete.athleteNoContests = athleteNoContests;
        athlete.athleteLink = athleteLink;
        athlete.athleteImage = athleteImage;

        return athlete;
    }
}

module.exports = UFC;
