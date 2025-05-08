import { Product } from './product';

export interface Cart extends Pick<Product, 'name' | 'price'> {
  id: string;
  productId: string;
  quantity: number;
  image: string;
}
