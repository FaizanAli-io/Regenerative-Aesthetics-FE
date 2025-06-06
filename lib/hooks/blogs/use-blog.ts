import { useQuery } from '@tanstack/react-query';
import { BLOGS_KEY } from '@/lib/hooks/_cache-keys';
import blogService, { Blog } from '@/lib/services/blog-service';

const useBlog = (id: number) =>
  useQuery({
    queryKey: [...BLOGS_KEY, id],
    queryFn: async () => {
      try {
        const response = await blogService.getOdd<Blog>(`/${id}`).request;
        return response.data;
      } catch (error) {
        console.error('Error fetching blog:', error);
        throw error;
      }
    },
    enabled: !!id,
  });

export { useBlog };
