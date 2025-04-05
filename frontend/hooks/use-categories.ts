import { useQuery } from '@tanstack/react-query';
import { CATEGORIES_KEY } from '@/cache-keys';
import category, { Category } from '@/services/category-services';

const useCategories = () =>
  useQuery({
    queryKey: CATEGORIES_KEY,
    queryFn: () => category.getAll<Category>().request.then(res => res.data),
  });

export { useCategories };
