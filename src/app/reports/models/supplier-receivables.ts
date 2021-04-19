import {Guid} from 'guid-typescript';

export interface SupplierReceivables {
  supplierId: Guid;
  supplierName: string;
  supplierAbbr: string;
  email: string;
  phone: string;
  receivables: number;
}
