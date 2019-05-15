
import { IProduct } from './product.interface';

export interface ICategory{
  id?: string;
  name?: string;
  isDeleted?: boolean;
  products?: IProduct[];
}
