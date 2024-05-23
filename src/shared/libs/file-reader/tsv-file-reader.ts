import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Offer, User, OfferType, Cities, UserType } from '../../types/index.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(
		private readonly filename: string
  ) {
    super();
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
      typeUser,
      commentsCount,
      latitude,
      longitude,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(createdDate),
      city: city as Cities,
      preview,
      images: this.parseItems(images),
      proStatus: Boolean(this.parseNumber(proStatus)),
      favouriteStatus: Boolean(this.parseNumber(favouriteStatus)),
      rating: this.parseFloatNumber(rating),
      housingType: housingType as OfferType,
      countRooms: this.parseNumber(countRooms),
      countGuests: this.parseNumber(countGuests),
      price: this.parseNumber(price),
      services: this.parseItems(services),
      user: this.parseUser(firstname, email, avatarPath, typeUser as UserType),
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

  private parseUser(firstname: string, email: string, avatarPath: string, typeUser: UserType): User {
    return { firstname, email, avatarPath, typeUser };
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
