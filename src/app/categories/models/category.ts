import {Guid} from 'guid-typescript';

export interface Category {
  categoryId: Guid | null;
  categoryName: string;
  picture: string;
}
