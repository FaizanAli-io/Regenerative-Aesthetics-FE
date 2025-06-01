import checkout, { Address, Order } from '@/lib/services/checkout-service';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type Req = Omit<Address, 'id'>;

const fn = async (data: Req): Promise<Order> => {
  const res = await checkout.create<Req, Order>(data);
  return res.data;
};

export const useCheckout = () => {
  return useMutation<Order, AxiosError, Req>({
    mutationFn: fn,

    onMutate: async newItem => {
      console.log('checkout started');
    },

    onSuccess: data => {
      console.log('checkout complete.', data);
    },

    onError: (error, newItem, context) => {
      console.error(error.message, error);
    },

    onSettled: () => {
      // queryClient.invalidateQueries(['wishlist']);
    },
  });
};
