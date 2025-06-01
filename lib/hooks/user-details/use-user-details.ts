import { useQuery } from '@tanstack/react-query';
import { USER_DETAILS_KEY } from '@/lib/hooks/_cache-keys';
import contact, { UserDetailsRes } from '@/lib/services/user-contact-service';

const useUserDetails = () =>
  useQuery({
    queryKey: USER_DETAILS_KEY,
    queryFn: () =>
      contact
        .getOdd<Omit<UserDetailsRes[], 'user'>>('/')
        .request.then(res => res.data),
  });

export { useUserDetails };
