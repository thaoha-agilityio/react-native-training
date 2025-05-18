import { Cart } from './cart';

export type Order = {
  id: string;
  shippingFee: number;
  total: number;
  orderItems: Cart[];
  userId: string;
};

export type OrderCreatePayload = {
  userId: string;
  shippingFee: number;
  total: number;
  orderItems: Cart[];
};
