import { create } from 'zustand';
import { Product } from '../services/products-service';
import { Address } from '../services/checkout-service';

export interface CartItem extends Omit<Product, 'category'> {
  quantity: number;
}

interface Cart {
  items: CartItem[];
  totalPrice: number;
}

interface CartStore {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  incrementQuantity: (itemId: number) => void;
  decrementQuantity: (itemId: number) => void;

  address: Omit<Address, 'id'> | null;
  setAddress: (address: Omit<Address, 'id'>) => void;

  selectedAddress: Address | null;
  setSelectedAddress: (address: any) => void;
}

export const useCart = create<CartStore>(set => ({
  cart: { items: [], totalPrice: 0 },
  address: null,
  selectedAddress: null,

  setAddress: (address: Omit<Address, 'id'>): void => {
    set(cart => ({ ...cart, address }));
  },

  setSelectedAddress: (selectedAddress: any): void => {
    set(cart => ({ ...cart, selectedAddress }));
  },

  addToCart: (item: CartItem): void =>
    set((state: CartStore) => {
      const existingItem = state.cart.items.find(
        (i: CartItem) => i.id === item.id
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cart.items.push(item);
      }
      const totalPrice = state.cart.items.reduce(
        (sum: number, i: CartItem) => sum + parseInt(i.price) * i.quantity,
        0
      );
      return { cart: { ...state.cart, totalPrice } };
    }),

  removeFromCart: (itemId: number): void =>
    set((state: CartStore) => {
      const items = state.cart.items.filter((i: CartItem) => i.id !== itemId);
      const totalPrice = items.reduce(
        (sum: number, i: CartItem) => sum + parseInt(i.price) * i.quantity,
        0
      );
      return { cart: { items, totalPrice } };
    }),

  clearCart: (): void => set({ cart: { items: [], totalPrice: 0 } }),

  incrementQuantity: (itemId: number): void =>
    set((state: CartStore) => {
      const existingItem = state.cart.items.find(
        (i: CartItem) => i.id === itemId
      );

      if (!existingItem) return state;

      const items = state.cart.items.map((item: CartItem) => {
        if (item.id === itemId) {
          const newQuantity = Math.min(item.quantity + 1, item.stock);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      const totalPrice = items.reduce((sum: number, i: CartItem) => {
        return sum + parseInt(i.price) * i.quantity;
      }, 0);

      return { cart: { items, totalPrice } };
    }),

  decrementQuantity: (itemId: number): void =>
    set((state: CartStore) => {
      const existingItem = state.cart.items.find(
        (i: CartItem) => i.id === itemId
      );

      if (!existingItem) return state;

      const items = state.cart.items.map((item: CartItem) => {
        if (item.id === itemId) {
          const newQuantity = Math.max(item.quantity - 1, 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      const totalPrice = items.reduce(
        (sum: number, i: CartItem) => sum + parseInt(i.price) * i.quantity,
        0
      );
      return { cart: { items, totalPrice } };
    }),
}));
