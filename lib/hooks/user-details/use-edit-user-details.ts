import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { USER_DETAILS_KEY } from '../_cache-keys';
import contact, {
  UserDetailsReq,
  UserDetailsRes,
} from '@/lib/services/user-contact-service';

interface Req extends UserDetailsReq {
  id: number;
}

const fn = async (data: Req): Promise<UserDetailsRes> => {
  const res = await contact.update<Req>(data);
  return res.data;
};

export const useUpdateUserDetails = () => {
  const queryClient = useQueryClient();

  return useMutation<UserDetailsRes, AxiosError, Req>({
    mutationFn: fn,
    // onMutate: async newItem => {
    //   console.log('updating contact details...', newItem);
    // },

    onSuccess: data => {
      // console.log('updated the contact details...', data);
      queryClient.invalidateQueries({ queryKey: USER_DETAILS_KEY });
    },

    onError: error => {
      console.error(error.message, error);
    },

    onSettled: () => {},
  });
};
