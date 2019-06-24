import { IOrder } from './order.interface';
import { IProduct } from './product.interface';

export interface IBox {
    id: string;
    weight: number;
    productListId: string;
    product: IProduct;
    order: IOrder;
}
