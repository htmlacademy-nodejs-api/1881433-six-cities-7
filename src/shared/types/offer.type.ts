import { Service } from './service.type.js';
import { User } from './user.type.js';
import { Image } from './image.type.js';
import { OfferType } from './offer-type.enum.js';
import { Cities } from './cities.enum.js';

export type Offer = {
    title: string;
    description: string;
    postDate: Date;
    city: Cities;
    preview: string;
    images: Image[];
    proStatus: boolean;
    favouriteStatus: boolean;
    rating: number;
    housingType: OfferType;
    countRooms: number;
    countGuests: number;
    price: number;
    services: Service[];
    user: User;
    commentsCount: number;
    latitude: number;
    longitude: number;
}
