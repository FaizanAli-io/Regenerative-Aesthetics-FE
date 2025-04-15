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
    queryFn: () => api.get<Res[]>('/users/all').then(res => res.data),
  });

export { useUsers };
