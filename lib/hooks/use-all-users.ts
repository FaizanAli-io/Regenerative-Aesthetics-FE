import { useQuery } from '@tanstack/react-query';
import { PRODUCTS_KEY, USERS_KEY } from '@/lib/hooks/_cache-keys';
import user from '@/lib/services/user-services';
import { User } from '../services/auth-service';

interface Res extends User {
  createdAt: string;
  updatedAt: string;
}

const useUsers = () =>
  useQuery({
    queryKey: USERS_KEY,
    queryFn: async () => {
      try {
        const response = await user.getAll<Res>().request;
        return response.data || [];
      } catch (error) {
        console.error('Error fetching users:', error);
        return [];
      }
    },
    initialData: [],
  });

export { useUsers };
