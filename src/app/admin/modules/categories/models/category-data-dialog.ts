import {Guid} from 'guid-typescript';

export interface CategoryDataDialog {
  dialogFlag: string;
  categoryId: Guid;
  categoryName: string | null;
  picture: string | null;
}
