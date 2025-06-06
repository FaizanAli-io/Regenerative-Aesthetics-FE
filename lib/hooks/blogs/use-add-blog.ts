import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { BLOGS_KEY } from '@/lib/hooks/_cache-keys';
import blogService, { BlogFormData } from '@/lib/services/blog-service';

const useAddBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: BlogFormData) => {
      const response = await blogService.create<BlogFormData, any>(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BLOGS_KEY });
      toast.success('Blog created successfully!');
    },
    onError: (error: any) => {
      console.error('Error creating blog:', error);
      toast.error(error?.response?.data?.message || 'Failed to create blog');
    },
  });
};

export { useAddBlog };
