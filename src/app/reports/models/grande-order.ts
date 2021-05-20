import {Guid} from 'guid-typescript';
import {GrandeOrderItem} from './grande-order-item';

export interface GrandeOrder {
  orderId: Guid;
  orderStartDate: any;
  orderStopDate: any;
  orderStatus: string;
  totalGrandePrice: number;
  totalGrandeFundPrice: number;
  grandeOrderItem: GrandeOrderItem[];
}
