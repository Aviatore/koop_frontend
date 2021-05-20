import {Guid} from 'guid-typescript';

export interface SupplierProductsList {
  productId: Guid;
  productName: string;
  categoryName: string;
  price: number;
  description: string;
  amountInMagazine: number;
  magazine: boolean;
  amountMax: number;
  deposit: number;
  picture: string;
  unitId: Guid;
  supplierId: Guid;
  unitName: string;
  available: boolean;
  blocked: boolean;
}

