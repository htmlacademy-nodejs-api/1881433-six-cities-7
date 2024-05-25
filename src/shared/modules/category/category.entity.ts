import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop
} from '@typegoose/typegoose';

import { Service } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CategoryEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'services',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CategoryEntity extends defaultClasses.TimeStamps implements Service {
    @prop({ required: true, trim: true })
  public name!: string;
}

export const CategoryModel = getModelForClass(CategoryEntity);
