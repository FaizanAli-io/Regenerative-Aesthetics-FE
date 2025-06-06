import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { BLOGS_KEY } from '@/lib/hooks/_cache-keys';
import blogService from '@/lib/services/blog-service';

const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await blogService.delete(id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_KEY });
      toast.success('Blog deleted successfully!');
    },
    onError: (error: any) => {
      console.error('Error deleting blog:', error);
      toast.error(error?.response?.data?.message || 'Failed to delete blog');
    },
  });
};

export { useDeleteBlog };
