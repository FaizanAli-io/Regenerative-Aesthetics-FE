import { useQuery } from '@tanstack/react-query';
import { BLOGS_KEY } from '@/lib/hooks/_cache-keys';
import blogService, { Blog } from '@/lib/services/blog-service';

const useBlogs = () =>
  useQuery({
    queryKey: BLOGS_KEY,
    queryFn: async () => {
      try {
        const response = await blogService.getOdd<Blog[]>('').request;
        return response.data || [];
      } catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
      }
    },
    initialData: [],
  });

export { useBlogs };
