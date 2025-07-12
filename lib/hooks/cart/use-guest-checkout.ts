// import { order } from '@/lib/services/orders-service';
import { Address, Order } from '@/lib/services/checkout-service';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import order from '@/lib/services/orders-service';

// type Req = Omit<Address, 'id'>;
interface ShippingAddress {
  phone: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  country: string;
}

interface Product {
  id: number;
  product_quantity: number;
}

interface Req {
  shippingAddress: ShippingAddress;
  products: Product[];
  customerEmail: string;
  customerName: string;
  customerPhone: string;
}

const fn = async (data: Req): Promise<Order> => {
  const res = await order.create<Req, Order>(data, '/guest');
  return res.data;
};

export const useGuestCheckout = () => {
  return useMutation<Order, AxiosError, Req>({
    mutationFn: fn,

    onMutate: async newItem => {
      console.log('guest checkout started');
    },

    onSuccess: data => {
      console.log('guest checkout complete.', data);
    },

    onError: (error, newItem, context) => {
      console.error(error.message, error);
    },

    onSettled: () => {
      // queryClient.invalidateQueries(['wishlist']);
    },
  });
};
