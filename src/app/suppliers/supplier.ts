import {Guid} from 'guid-typescript';

export interface Supplier {
 supplierId: Guid;
 blocked: boolean;
 available: boolean;
 supplierName: string;
 supplierAbbr: string;
 description: string;
 email: string;
 phone: string;
 picture: string;
 orderClosingDate: Date;
 receivables: number;
 oproFullName: string;
 oproId: Guid;
}
