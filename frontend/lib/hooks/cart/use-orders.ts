import order from '@/lib/services/orders-service';
import { useQuery } from '@tanstack/react-query';
import { ORDERS_KEY } from '@/lib/hooks/_cache-keys';
import { Order } from '@/lib/services/checkout-service';

const useOrders = () =>
  useQuery({
    queryKey: ORDERS_KEY,
    queryFn: () => order.getOdd<Order[]>('').request.then(res => res.data),
  });

export { useOrders };
