import {AvailQuantity} from './availQuantity';
import {Category} from './categories';

export interface Product {
  productName: string;
  price: number;
  picture: string;
  blocked: boolean;
  unitId: string;
  available: boolean;
  amountMax: number;
  description: string;
  supplierId: string;
  deposit: number;
  magazine: boolean;
  availQuantity: AvailQuantity[];
  category: Category[];
}
