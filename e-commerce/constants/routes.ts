export const ROUTES = {
  ONBOARDING: '/(public)',
  LOGIN: '/(public)/login',
  HOME: '/(tabs)',
  PRODUCTS: '/(tabs)/wishlist',
  PRODUCT_DETAILS: (id: string) => `/products/${id}` as const,
  EDIT_PROFILE: '/edit-profile',
  CART: '/cart',
  CHECKOUT: '/checkout',
} as const;

export const SCREENS = {
  PRODUCT_DETAILS: 'products/[id]',
  EDIT_PROFILE: 'edit-profile/index',
  CART: 'cart/index',
  CHECKOUT: 'checkout/index',
  SETTING: 'setting',
} as const;
