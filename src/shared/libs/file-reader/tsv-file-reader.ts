import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, User } from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
		private readonly filename: string
  ) { }

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      createdDate,
      city,
      preview,
      images,
      proStatus,
      favouriteStatus,
      rating,
      housingType,
      countRooms,
      countGuests,
      price,
      services,
      firstname,
      email,
      avatarPath,
      password,
      typeUser,
      commentsCount,
      latitude,
      longitude,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(createdDate),
      city,
      preview,
      images: this.parseItems(images),
      proStatus,
      favouriteStatus,
      rating: this.parseFloatNumber(rating),
      housingType,
      countRooms: this.parseNumber(countRooms),
      countGuests: this.parseNumber(countGuests),
      price: this.parseNumber(price),
      services: this.parseItems(services),
      user: this.parseUser(firstname, email, avatarPath, password, typeUser),
      commentsCount: this.parseNumber(commentsCount),
      latitude: this.parseFloatNumber(latitude),
      longitude: this.parseFloatNumber(longitude),
    };
  }

  private parseItems(itemsString: string): { name: string }[] {
    return itemsString.split(';').map((name) => ({ name }));
  }

  private parseNumber(itemStringToNumber: string): number {
    return Number.parseInt(itemStringToNumber, 10);
  }

  private parseFloatNumber(itemStringToNumber: string): number {
    return Number.parseFloat(itemStringToNumber);
  }

  private parseUser(firstname: string, email: string, avatarPath: string, password: string, typeUser: string): User {
    return { firstname, email, avatarPath, password, typeUser };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
