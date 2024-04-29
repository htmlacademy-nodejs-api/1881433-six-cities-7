import { Service } from './service.type.js';
import { User } from './user.type.js';
import { Image } from './image.type.js';

export type Offer = {
    title: string;
    description: string;
    postDate: Date;
    city: string;
    preview: string;
    images: Image[];
    proStatus: string;
    favouriteStatus: string;
    rating: number;
    housingType: string;
    countRooms: number;
    countGuests: number;
    price: number;
    services: Service[];
    user: User;
    commentsCount: number;
    latitude: number;
    longitude: number;
}
