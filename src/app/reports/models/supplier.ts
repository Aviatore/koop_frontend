import {Guid} from 'guid-typescript';

export interface Supplier {
  supplierId: Guid;
  supplierName: string;
  supplierAbbr: string;
}
