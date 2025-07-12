import order from '@/lib/services/orders-service';
import { useQuery } from '@tanstack/react-query';
import { ORDERS_KEY } from '@/lib/hooks/_cache-keys';
import { Order } from '@/lib/services/checkout-service';
import { User } from '@/lib/services/auth-service';

interface Res extends Order {
  user: User;
  totalAmount: number;
}

const useAllOrders = () =>
  useQuery({
    queryKey: ORDERS_KEY,
    queryFn: async () => {
      try {
        const response = await order.getOdd<Res[]>('/all?limit=1000').request;
        return response.data || ([] as Res[]);
      } catch (error) {
        console.error('Error fetching orders:', error);
        return [] as Res[];
      }
    },
    initialData: [],
  });

export { useAllOrders };
