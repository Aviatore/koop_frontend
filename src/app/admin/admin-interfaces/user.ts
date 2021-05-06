import {Roles} from './roles';

export interface User {
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  email: string;
  newPassword: string;
  repeatPassword: string;
  oldPassword: string;
  debt: number;
  fundId: number;
  info: string;
  id: string;
  role: string[];
}
