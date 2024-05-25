import { OfferType, Cities, Image } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: Cities;
  public preview: string;
  public images: Image[];
  public rating: number;
  public housingType: OfferType;
  public countRooms: number;
  public countGuests: number;
  public price: number;
  public services: { name: string }[];
  public userId: string;
  public latitude: number;
  public longitude: number;
}
