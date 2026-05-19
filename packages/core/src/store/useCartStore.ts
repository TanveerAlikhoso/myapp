import { create } from 'zustand';

export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

export interface Customizations {
  bun?: CustomizationOption;
  patty?: CustomizationOption;
  cheese?: CustomizationOption;
  toppings: CustomizationOption[];
  sauces: CustomizationOption[];
}

export interface CartItem {
  id: string; // Unique hash: productId + JSON.stringify(customizations)
  productId: string;
  name: string;
  basePrice: number;
  price: number; // Single item price including all customizations
  quantity: number;
  image: string;
  customizations?: Customizations;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'burgers' | 'pizza' | 'sides' | 'drinks' | 'pasta';
  tag?: string;
  isPopular?: boolean;
}

interface CartState {
  cart: CartItem[];
  activeProductId: string | null;
  
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCustomizer: (productId: string) => void;
  closeCustomizer: () => void;
  
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  activeProductId: null,

  addToCart: (newItem) => {
    set((state) => {
      const existingItemIndex = state.cart.findIndex((item) => item.id === newItem.id);
      
      if (existingItemIndex > -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1;
        return { cart: updatedCart };
      }
      
      return {
        cart: [...state.cart, { ...newItem, quantity: 1 }],
      };
    });
  },

  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(id);
      return;
    }
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ cart: [] }),

  openCustomizer: (productId) => set({ activeProductId: productId }),
  closeCustomizer: () => set({ activeProductId: null }),

  getTotalItems: () => {
    return get().cart.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
