import { USER_DETAILS_KEY } from '@/lib/hooks/_cache-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import contact from '@/lib/services/user-contact-service';

const fn = async (id: number): Promise<unknown> => {
  const res = await contact.delete(id);
  return res.data;
};

export const useDeleteUserDetails = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, number>({
    mutationFn: fn,

    onMutate: async newItem => {
      console.log('deleting user details...');
      // Optimistic update logic can be implemented here if needed
    },

    onSuccess: data => {
      console.log('deleted user detail.', data);
      queryClient.invalidateQueries({ queryKey: USER_DETAILS_KEY });
    },

    onError: (error, newItem, context) => {
      console.error(error.message, error);
    },

    onSettled: () => {
      // Also invalidate queries when the mutation is settled (either succeeded or failed)
    },
  });
};
