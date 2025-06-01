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
    queryFn: () => order.getAll<Res>().request.then(res => res.data),
  });

export { useAllOrders };
