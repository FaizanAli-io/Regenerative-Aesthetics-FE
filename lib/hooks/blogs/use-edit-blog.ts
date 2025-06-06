import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { BLOGS_KEY } from '@/lib/hooks/_cache-keys';
import blogService, { Blog } from '@/lib/services/blog-service';

const useEditBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Blog) => {
      const response = await blogService.update<Blog>(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_KEY });
      toast.success('Blog updated successfully!');
    },
    onError: (error: any) => {
      console.error('Error updating blog:', error);
      toast.error(error?.response?.data?.message || 'Failed to update blog');
    },
  });
};

export { useEditBlog };
