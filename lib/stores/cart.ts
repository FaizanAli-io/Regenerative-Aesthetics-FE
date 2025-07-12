import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: { items: [], totalPrice: 0 },
      address: null,
      selectedAddress: null,

      setAddress: (address: Omit<Address, 'id'>) => {
        set({ address });
      },

      setSelectedAddress: (selectedAddress: any) => {
        set({ selectedAddress });
      },

      addToCart: (item: CartItem) => {
        const items = [...get().cart.items];
        const index = items.findIndex(i => i.id === item.id);

        if (index >= 0) {
          items[index] = {
            ...items[index],
            quantity: items[index].quantity + item.quantity,
          };
        } else {
          items.push(item);
        }

        const totalPrice = items.reduce(
          (sum, i) => sum + parseInt(i.price) * i.quantity,
          0
        );

        set({ cart: { items, totalPrice } });
      },

      removeFromCart: (itemId: number) => {
        const items = get().cart.items.filter(i => i.id !== itemId);
        const totalPrice = items.reduce(
          (sum, i) => sum + parseInt(i.price) * i.quantity,
          0
        );
        set({ cart: { items, totalPrice } });
      },

      clearCart: () => {
        set({ cart: { items: [], totalPrice: 0 } });
      },

      incrementQuantity: (itemId: number) => {
        const items = get().cart.items.map(item =>
          item.id === itemId
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, item.stock),
              }
            : item
        );

        const totalPrice = items.reduce(
          (sum, i) => sum + parseInt(i.price) * i.quantity,
          0
        );

        set({ cart: { items, totalPrice } });
      },

      decrementQuantity: (itemId: number) => {
        const items = get().cart.items.map(item =>
          item.id === itemId
            ? {
                ...item,
                quantity: Math.max(item.quantity - 1, 1),
              }
            : item
        );

        const totalPrice = items.reduce(
          (sum, i) => sum + parseInt(i.price) * i.quantity,
          0
        );

        set({ cart: { items, totalPrice } });
      },
    }),
    {
      name: 'cart-storage', // key in localStorage
      partialize: state => ({
        cart: state.cart,
        address: state.address,
        selectedAddress: state.selectedAddress,
      }),
    }
  )
);
