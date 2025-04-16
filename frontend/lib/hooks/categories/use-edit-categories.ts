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

interface Req {
  id: number;
  title: string;
  description: string;
  parentCategoryId?: number;
}

const fn = async (data: Req): Promise<Res> => {
  const res = await category.update<Req>(data);
  return res.data;
};

export const useEditCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<Res, AxiosError, Req>({
    mutationFn: fn,

    onMutate: async newItem => {
      console.log('updating category...');
      // Optimistic update logic can be implemented here if needed
    },

    onSuccess: data => {
      console.log('Category updated.', data);
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
