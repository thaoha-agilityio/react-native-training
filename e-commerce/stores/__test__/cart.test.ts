import { act, renderHook } from 'test-utils';

// Stores
import { useCartStore } from '@/stores';

// Mocks
import { MOCK_CART } from '@/mocks/cart';

describe('useCartStore', () => {
  beforeEach(() => {
    act(() => {
      useCartStore.getState().clearCart(); // Reset state before each test
    });
  });

  it('should add an item to the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItemToCart(MOCK_CART[0]);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toMatchObject(MOCK_CART[0]);
  });

  it('should update the quantity of an existing item', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItemToCart(MOCK_CART[0]);
      result.current.updateQuantity('1', 3);
    });

    expect(result.current.cart[0].quantity).toBe(3);
  });

  it('should remove an item from the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItemToCart(MOCK_CART[0]);
      result.current.removeCart('1');
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it('should calculate total price correctly', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItemToCart({ ...MOCK_CART[0], quantity: 2 });
      result.current.addItemToCart(MOCK_CART[1]);
    });

    expect(result.current.getTotalPrice()).toBe(40);
  });

  it('should clear the cart', () => {
    const { result } = renderHook(() => useCartStore());

    act(() => {
      result.current.addItemToCart(MOCK_CART[0]);
      result.current.clearCart();
    });

    expect(result.current.cart).toHaveLength(0);
  });
});
