import {Guid} from 'guid-typescript';

export interface CoopDept {
  id: Guid;
  firstName: string;
  lastName: string;
  debt?: number;
  email: string;
  phoneNumber: string;
}
