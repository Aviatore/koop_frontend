import {Guid} from 'guid-typescript';

export interface GrandeOrderItem {
  orderedItemId: Guid;
  productId: Guid;
  productName: string;
  price: number;
  fundPrice: number;
  totalPrice: number;
  totalFundPrice: number;
  quantity: number;
  unitName: string;
  coopId: Guid;
  coopFirstName: string;
  coopLastName: string;
  coopFundValue: number;
  supplierId: Guid;
  supplierName: string;
  supplierAbbr: string;
}
