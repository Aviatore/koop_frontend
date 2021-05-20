import {Guid} from 'guid-typescript';
import {SupplierReportOrder} from './supplier-report-order';

export interface SupplierReport {
  supplierId: Guid;
  supplierName: string;
  supplierAbbr: string;
  email: string;
  totalProfit: number;
  supplierReportOrder: SupplierReportOrder[];
}

