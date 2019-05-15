export interface IProduct {
  id?: string;
  isDeleted?: boolean;
  name?: string;
  weight?: number;
  manufacturer?: string;
  price?: number;
  isCountable?: boolean;
  categoryId?: string;
  image?: string;
}
