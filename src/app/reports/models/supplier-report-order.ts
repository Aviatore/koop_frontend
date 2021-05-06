import {Guid} from 'guid-typescript';
import {SupplierReportItems} from './supplier-report-items';

export interface SupplierReportOrder {
  orderId: Guid;
  orderStartDate: Date;
  orderStopDate: Date;
  orderTotalPrice: number;
  supplierReportItems: SupplierReportItems[];
}
