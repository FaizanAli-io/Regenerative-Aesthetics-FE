import { useQuery } from '@tanstack/react-query';
import { USERS_KEY } from '@/lib/hooks/_cache-keys';
import { User } from '../services/auth-service';
import api from '../services/api-client';

interface Res extends User {
  createdAt: string;
  updatedAt: string;
}

const useUsers = () =>
  useQuery({
    queryKey: USERS_KEY,
    queryFn: async () => {
      try {
        const response = await api.get<Res[]>('/users/all');
        return response.data || [];
      } catch (error) {
        console.error('Error fetching users:', error);
        return [];
      }
    },
    initialData: [],
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
  });

export { useUsers };
