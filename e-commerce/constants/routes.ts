export const ROUTES = {
  ONBOARDING: '/(public)',
  LOGIN: '/(public)/login',
  HOME: '/(tabs)',
  PRODUCTS: '/(tabs)/wishlist',
  PRODUCT_DETAILS: (id: string) => `/products/${id}` as const,
} as const;
