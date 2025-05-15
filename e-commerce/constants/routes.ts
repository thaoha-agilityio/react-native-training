export const ROUTES = {
  ONBOARDING: '/(public)',
  LOGIN: '/(public)/login',
  HOME: '/(tabs)',
  PRODUCTS: '/(tabs)/wishlist',
  PRODUCT_DETAILS: (id: string) => `/products/${id}` as const,
  EDIT_PROFILE: '/edit-profile',
} as const;
