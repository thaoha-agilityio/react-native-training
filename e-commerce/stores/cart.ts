import { create } from 'zustand';

// Types
import { Cart } from '@/interfaces';

type CartState = {
  cart: Cart[];
};

type CartActions = {
  removeCart: (id: string) => void;
  addItemToCart: (item: Cart) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
};

export const useCartStore = create<CartState & CartActions>()((set, get) => ({
  cart: [],
  removeCart: (productId: string) => {
    // Filter out the cart with the specified ID
    set((state) => ({
      cart: state.cart.filter((cart) => cart.productId !== productId),
    }));
  },
  addItemToCart: (item: Cart) => {
    set((state) => {
      const existedProductIndex = state.cart.findIndex(
        (cartItem) => cartItem.productId === item.productId,
      );

      if (existedProductIndex !== -1) {
        // Update quantity while preserving other item properties
        const updatedCarts = state.cart.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem,
        );

        return { cart: updatedCarts };
      }

      return { cart: [...state.cart, item] };
    });
  },

  updateQuantity: (id: string, quantity: number) => {
    set((state) => ({
      cart: state.cart.map((cart) => {
        if (cart.productId === id) {
          return { ...cart, quantity };
        }

        return cart;
      }),
    }));
  },

  getTotalPrice: () => {
    const carts = get().cart;

    return carts.reduce(
      (accumulator, { price, quantity }) => accumulator + price * quantity,
      0,
    );
  },

  clearCart: () => {
    set({ cart: [] });
  },
}));
