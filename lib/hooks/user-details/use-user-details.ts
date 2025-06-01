import { useQuery } from '@tanstack/react-query';
import { USER_DETAILS_KEY } from '@/lib/hooks/_cache-keys';
import contact, { UserDetailsRes } from '@/lib/services/user-contact-service';

const useUserDetails = () =>
  useQuery({
    queryKey: USER_DETAILS_KEY,
    queryFn: async () => {
      try {
        const response = await contact.getOdd<Omit<UserDetailsRes[], 'user'>>(
          '/'
        ).request;
        return response.data || [];
      } catch (error) {
        console.error('Error fetching user details:', error);
        return [];
      }
    },
    initialData: [],
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

export { useUserDetails };
