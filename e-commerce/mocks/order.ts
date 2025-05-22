import { MOCK_CART } from './cart';

export const ORDER_PAYLOAD = {
  orderItems: MOCK_CART,
  userId: '1',
  shippingFee: 5,
  total: 200,
};

export const MOCK_ORDERS = [
  {
    id: '1',
    shippingFee: 5,
    total: 200,
    orderItems: MOCK_CART,
    userId: '1',
  },
  {
    id: '2',
    shippingFee: 5,
    total: 100,
    orderItems: MOCK_CART,
    userId: '1',
  },
];
