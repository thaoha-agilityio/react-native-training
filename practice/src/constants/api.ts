import Config from 'react-native-config';

export const API_BASE_URL = Config.API_URL || '';

export const ROUTES = {
  LOGIN: '/login',
  USERS: '/users',
  PRODUCTS: '/products',
  ORDERS: '/orders',
};

export const IMGBB_URL = `${Config.IMGBB_URL}?key=${Config.IMGBB_API_KEY}`;
