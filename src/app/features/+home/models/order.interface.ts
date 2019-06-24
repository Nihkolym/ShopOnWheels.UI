import { IProduct } from './product.interface';

export interface IOrder {
  id?: string;
  isDeleted?: boolean;
  orderDate?: string;
  orderDeliver?: string;
  frequency?: number;
  total?: number;
  isActive?: boolean;
  products?: IProduct[];
}
