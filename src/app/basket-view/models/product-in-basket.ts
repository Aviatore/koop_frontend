import {Guid} from 'guid-typescript';

export interface ProductInBasket {
  orderedItemId: Guid;
  orderId: Guid;
  productId: Guid;
  firstName: string;
  lastName: string;
  productName: string;
  description: string | null;
  unit: string;
  orderStatus: string;
  quantity: number;
  price: number;
  unitPrice: number;
}
