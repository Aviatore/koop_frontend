import {Guid} from 'guid-typescript';
import {CoopOrderNode} from './coop-order-node';

export interface CoopOrder {
  orderId: Guid;
  id: Guid;
  orderStartDate: Date;
  orderStopDate: Date;
  firstName: string;
  lastName: string;
  fundValue: number;
  orderTotalPrice: number;
  orderTotalFundPrice: number;
  coopOrderNode: CoopOrderNode[];
}
