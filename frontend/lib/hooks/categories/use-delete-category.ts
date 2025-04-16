import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import category, { Category } from '@/lib/services/category-services';
import { CATEGORIES_KEY } from '../_cache-keys';

interface Res extends Omit<Category, 'parentCategory' | 'children'> {
  addedBy: {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

const fn = async (id: number): Promise<Res> => {
  const res = await category.delete(id);
  return res.data;
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Res, AxiosError, number>({
    mutationFn: fn,

    onMutate: async newItem => {
      console.log('deleting category...');
      // Optimistic update logic can be implemented here if needed
    },

    onSuccess: data => {
      console.log('Category deleted.', data);
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
    },

    onError: (error, newItem, context) => {
      console.error(error.message, error);
    },

    onSettled: () => {
      // Also invalidate queries when the mutation is settled (either succeeded or failed)
      // queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY });
    },
  });
};
