import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';

import { OfferType, Cities } from '../../types/index.js';
import { CategoryEntity } from '../category/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

  @modelOptions({
    schemaOptions: {
      collection: 'offers',
      timestamps: true,
    }
  })

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true })
  public description!: string;

  @prop({ required: true })
  public postDate!: Date;

  @prop({ required: true })
  public city!: Cities;

  @prop({ required: true })
  public preview!: string;

  @prop({
    required: true,
    default: []
  })
  public images!: string[];

  @prop({ required: true })
  public rating!: number;

  @prop({
    housingType: () => String,
    enum: OfferType
  })
  public housingType!: OfferType;

  @prop({ required: true })
  public countRooms!: number;

  @prop({ required: true })
  public countGuests!: number;

  @prop()
  public price!: number;

  @prop({
    ref: CategoryEntity,
    required: true,
    default: [],
    _id: false
  })
  public services!: Ref<CategoryEntity>[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({default: 0})
  public commentCount!: number;

  @prop({ required: true })
  public latitude!: number;

  @prop({ required: true })
  public longitude!: number;

}

export const OfferModel = getModelForClass(OfferEntity);
