import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { USER_DETAILS_KEY } from '../_cache-keys';
import contact, {
  UserDetailsReq,
  UserDetailsRes,
} from '@/lib/services/user-contact-service';

const fn = async (data: UserDetailsReq): Promise<UserDetailsRes> => {
  const res = await contact.create<UserDetailsReq, UserDetailsRes>(data);
  return res.data;
};

export const useAddUserDetails = () => {
  const queryClient = useQueryClient();

  return useMutation<UserDetailsRes, AxiosError, UserDetailsReq>({
    mutationFn: fn,
    onMutate: async newItem => {
      console.log('adding contact details...');
    },

    onSuccess: data => {
      console.log('added the contact details...', data);
      queryClient.invalidateQueries({ queryKey: USER_DETAILS_KEY });
    },

    onError: error => {
      console.error(error.message, error);
    },

    onSettled: () => {},
  });
};
