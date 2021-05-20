import {Guid} from 'guid-typescript';
import {SupplierProductsList} from './supplier-products-list';

export interface SupplierStore {
  supplierId: Guid;
  supplierName: string;
  supplierAbbr: string;
  description: string;
  email: string;
  phone: string;
  picture: string;
  orderClosingDate: Date;
  receivables: number;
  supplierProductsList: SupplierProductsList[];
}
