import order from '@/lib/services/orders-service';
import { useQuery } from '@tanstack/react-query';
import { USER_ORDERS_KEY } from '@/lib/hooks/_cache-keys';
import { Order } from '@/lib/services/checkout-service';

const useOrders = () =>
  useQuery({
    queryKey: USER_ORDERS_KEY,
    queryFn: async () => {
      try {
        const response = await order.getOdd<Order[]>('').request;
        return response.data || [];
      } catch (error) {
        console.error('Error fetching orders:', error);
        return [];
      }
    },
    initialData: [],
  });

export { useOrders };
