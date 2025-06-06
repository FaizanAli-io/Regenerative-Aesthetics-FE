'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';
import CloudinaryUploader from '@/components/FileUploader';
import type { Blog } from '@/lib/services/blog-service';

// Form schema
const blogFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters' })
    .max(100, { message: 'Title must not exceed 100 characters' }),
  content: z
    .string()
    .min(50, { message: 'Content must be at least 50 characters' }),
  image_url: z.string().url({ message: 'Please upload a valid image' }),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface BlogFormProps {
  onSubmit: (data: BlogFormValues) => void;
  initialData?: Partial<Blog>;
  isLoading?: boolean;
  onCancel?: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({
  onSubmit,
  initialData,
  isLoading = false,
  onCancel,
}) => {
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      image_url: initialData?.image_url || '',
    },
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title || '',
        content: initialData.content || '',
        image_url: initialData.image_url || '',
      });
    }
  }, [initialData, form]);

  const handleSubmit = (data: BlogFormValues) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
        {' '}
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter blog title'
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='content'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Enter blog content'
                  rows={6}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name='image_url'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image *</FormLabel>
              <FormControl>
                <CloudinaryUploader
                  onImageUploaded={url => field.onChange(url)}
                  currentImage={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          {onCancel && (
            <Button
              type='button'
              variant='outline'
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button type='submit' disabled={isLoading}>
            {isLoading
              ? 'Saving...'
              : initialData?.id
              ? 'Update Blog'
              : 'Create Blog'}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default BlogForm;
