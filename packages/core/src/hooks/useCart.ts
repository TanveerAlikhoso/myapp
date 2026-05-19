import { useCartStore, CartItem } from '../store/useCartStore';

export function useCart() {
  const cart = useCartStore((state) => state.cart);
  const activeProductId = useCartStore((state) => state.activeProductId);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const openCustomizer = useCartStore((state) => state.openCustomizer);
  const closeCustomizer = useCartStore((state) => state.closeCustomizer);
  const totalItems = useCartStore((state) => 
    state.cart.reduce((total, item) => total + item.quantity, 0)
  );
  const totalPrice = useCartStore((state) => 
    state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  return {
    cart,
    activeProductId,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    openCustomizer,
    closeCustomizer,
    totalItems,
    totalPrice,
  };
}
