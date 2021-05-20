import {Guid} from 'guid-typescript';

export interface CoopOrderNode {
  orderId: Guid;
  orderedItemId: Guid;
  productId: Guid;
  productName: string;
  fundValue: number;
  price: number;
  fundPrice: number;
  quantity: number;
  totalPrice: number;
  totalFundPrice: number;
  orderStatusName: string;
}
