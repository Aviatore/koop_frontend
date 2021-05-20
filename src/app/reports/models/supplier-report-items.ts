import {Guid} from 'guid-typescript';

export interface SupplierReportItems {
  productId: Guid;
  productName: string;
  price: number;
  quantity: number;
  unitName: string;
  totalPrice: number;
}
