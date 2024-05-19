import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems, getMassiv } from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_COUNT_ROOMS = 1;
const MAX_COUNT_ROOMS = 8;
const MIN_COUNT_GUESTS = 1;
const MAX_COUNT_GUESTS = 10;
const MIN_COMMENTS_COUNT = 1;
const MAX_COMMENTS_COUNT = 100;
const MIN_RATING_COUNT = 1;
const MAX_RATING_COUNT = 5;
const MIN_LATITUDE_COUNT = -90;
const MAX_LATITUDE_COUNT = 90;
const MIN_LONGTITUDE_COUNT = -180;
const MAX_LONGTITUDE_COUNT = 180;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const preview = getRandomItem<string>(this.mockData.previews);
    const images = getMassiv<string>(this.mockData.images, 6).join(';');
    const proStatus = getRandomItem<string>(this.mockData.proStatuses);
    const favouriteStatus = getRandomItem<string>(this.mockData.favouriteStatuses);
    const rating = generateRandomValue(MIN_RATING_COUNT, MAX_RATING_COUNT, 1).toString();
    const housingType = getRandomItem<string>(this.mockData.housingTypes);
    const countRooms = generateRandomValue(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS).toString();
    const countGuests = generateRandomValue(MIN_COUNT_GUESTS, MAX_COUNT_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const services = getRandomItems<string>(this.mockData.services).join(';');
    const firstname = getRandomItem<string>(this.mockData.firstnames);
    const email = getRandomItem(this.mockData.emails);
    const avatarPath = getRandomItem(this.mockData.avatarPaths);
    const typeUser = getRandomItem(this.mockData.typeUsers);
    const commentsCount = generateRandomValue(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT).toString();
    const latitude = generateRandomValue(MIN_LATITUDE_COUNT, MAX_LATITUDE_COUNT, 6).toString();
    const longitude = generateRandomValue(MIN_LONGTITUDE_COUNT, MAX_LONGTITUDE_COUNT, 6).toString();


    return [
      title, description, postDate,
      city, preview, images, proStatus,
      favouriteStatus, rating, housingType, countRooms,
      countGuests, price, services, firstname, email,
      avatarPath, typeUser, commentsCount,
      latitude, longitude
    ].join('\t');
  }
}
