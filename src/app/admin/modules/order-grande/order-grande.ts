import {Guid} from 'guid-typescript';

export interface OrderGrande {
  orderId: Guid;
  orderStartDate: Date;
  orderStopDate: Date;
  orderStatusId: Guid;
  orderStatusName: string;
}
