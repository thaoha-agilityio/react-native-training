export interface ProductImg {
  id: string;
  image: string;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  reviewNumber: number;
  images: ProductImg[];
}
